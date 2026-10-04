// =============================================================================
// PAGE WEIGHT AUDIT
// =============================================================================
//
// THE QUESTION THIS ANSWERS
//   "How many megabytes (MB) does one visitor have to download to use this
//    website, and which files make up most of that?"
//
// WHY THAT MATTERS
//   Every visitor downloads these files from the server. If the website is
//   30 MB and 100 people open it at once, the server has to send 3,000 MB.
//   Smaller files = more people can use the site at the same time, and the
//   site loads faster on slow Wi-Fi.
//
// WHAT THIS SCRIPT DOES
//   It looks inside the "dist" folder (the finished website, exactly as it
//   would be uploaded to the server), measures every file, and prints 5 reports
//   (A, B, C, D, E).
//   It ONLY READS files. It never changes, deletes or uploads anything.
//
// HOW TO RUN IT (from the project's main folder)
//   1.  npm run build                         <- makes the "dist" folder
//   2.  node scripts/page-weight-audit.mjs    <- runs this script
//
// WHAT IS A ".mjs" FILE?
//   It is a JavaScript file that runs with Node.js (JavaScript outside a
//   browser). The "m" means it uses "modern" import statements.
// =============================================================================


// -----------------------------------------------------------------------------
// PART 1: TOOLS WE BORROW FROM NODE.JS
// -----------------------------------------------------------------------------
// "import" means "bring in a ready-made tool". These tools come built into
// Node.js, so nothing needs to be installed. "node:" at the start of the name
// means "this one is built in".

// "fs" = "file system". These let the script look at folders and read files.
//   readdirSync = list what is inside a folder
//   readFileSync = read the contents of a file
// ("Sync" means the script waits for each answer before moving on.)
import { readdirSync, readFileSync } from "node:fs";

// "path" = tools for working with file names and folder paths.
//   join = glue folder names together correctly (dist + videos -> dist/videos)
//   extname = get the ending of a file name (AFib.mp4 -> ".mp4")
//   relative = shorten a path (dist/videos/AFib.mp4 -> videos/AFib.mp4)
import { join, extname, relative } from "node:path";

// "zlib" = compression tools. gzipSync squeezes data the same way a web server
// does before sending a file to a visitor. We use it to measure the real size
// that travels over the network.
import { gzipSync } from "node:zlib";

// The same list of rhythms that the website itself uses (normal-sinus,
// atrial-fibrillation, ...). Report C and E use it to work out which file names
// the code builds while running. This one is our own file, not a Node tool.
import { RHYTHMS } from "../src/data/rhythms.js";


// -----------------------------------------------------------------------------
// PART 2: SETTINGS
// -----------------------------------------------------------------------------
// "const" makes a named box that holds a value which will not change.

// The folder holding the finished website. This is what gets uploaded to the
// server, so this is what visitors download.
const DIST = "dist";

// The folder holding our own written code. We search it later to find out
// which videos and images the code actually uses.
const SRC = "src";


// -----------------------------------------------------------------------------
// PART 3: FUNCTION THAT LISTS EVERY FILE IN A FOLDER
// -----------------------------------------------------------------------------
// A "function" is a named recipe we can use again. This one is called listFiles.
// You give it a folder (dir) and it gives back a list of every file inside,
// including files hidden in sub-folders.
function listFiles(dir) {
  // Start with an empty list. We will add each file we find.
  const files = [];

  // Look inside the folder. Each thing found is called an "entry" and can be
  // either a file or another folder. { withFileTypes: true } lets us tell
  // which is which.
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    // Build the full path to this entry, e.g. "dist" + "videos" -> "dist/videos".
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // It is a folder. So call this same function again on that folder, and
      // add everything it finds to our list. The "..." spreads a list out so
      // its items get added one by one. This is how we reach files in sub-folders.
      files.push(...listFiles(fullPath));
    } else {
      // It is a regular file. Add it to the list.
      files.push(fullPath);
    }
  }

  // Hand the finished list back to whoever asked for it.
  return files;
}


// -----------------------------------------------------------------------------
// PART 4: FUNCTION THAT PUTS A FILE INTO A CATEGORY
// -----------------------------------------------------------------------------
// We want totals like "videos use 25 MB, images use 5 MB". To do that, we
// decide a file's category from the ending of its name.

// An "object" is a set of labels with a list under each one.
// Left side = the category name. Right side = the file endings in that category.
const CATEGORIES = {
  video: [".mp4", ".webm", ".mov"],
  image: [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico"],
  code: [".js", ".css", ".html", ".json"],
};

// You give it a file name, it gives back "video", "image", "code" or "other".
function categoryOf(file) {
  // Get the file ending in lower-case, so ".MP4" and ".mp4" count the same.
  const ext = extname(file).toLowerCase();

  // Go through each category and check whether its list contains this ending.
  // Object.entries turns the object above into pairs: ["video", [".mp4", ...]]
  for (const [name, extensions] of Object.entries(CATEGORIES)) {
    if (extensions.includes(ext)) return name; // found a match, stop here
  }

  // Nothing matched, so it is something else (a font, for example).
  return "other";
}


// -----------------------------------------------------------------------------
// PART 5: FUNCTION THAT MEASURES HOW MUCH A FILE COSTS TO DOWNLOAD
// -----------------------------------------------------------------------------
// The size of a file on your disk is not always the size a visitor downloads.
//
// Web servers compress TEXT files (code, SVG images) before sending them, so
// those arrive smaller than they are on disk. Videos and PNG images are
// ALREADY compressed, so compressing them again does nothing; they arrive at
// full size.
//
// This function measures what really travels over the network.

// File endings that servers compress. (Text-based formats only.)
const COMPRESSED_BY_SERVER = [".js", ".css", ".html", ".json", ".svg"];

function transferSize(file) {
  // Read the whole file into memory. "bytes" is the raw data. The ".length" of
  // it is its size in bytes.
  const bytes = readFileSync(file);

  // If this is a text-type file, compress it the way the server would, and
  // report the compressed size.
  if (COMPRESSED_BY_SERVER.includes(extname(file).toLowerCase())) {
    return gzipSync(bytes).length;
  }

  // Otherwise (videos, PNGs) it travels at its normal size.
  return bytes.length;
}

// Small helper that turns bytes into megabytes with 2 decimal places.
// 1 KB = 1024 bytes, and 1 MB = 1024 KB, so we divide by 1024 twice.
// ".toFixed(2)" keeps two digits after the decimal point, e.g. "3.25".
const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2) + " MB";


// -----------------------------------------------------------------------------
// PART 6: GATHER THE NUMBERS
// -----------------------------------------------------------------------------
// Take every file in dist, and for each one record three facts:
// its name, its category, and its download size.
const files = listFiles(DIST).map((file) => ({
  // Shorten "dist/videos/AFib.mp4" to "videos/AFib.mp4". On Windows paths use
  // backslashes, so we swap them for forward slashes to keep output tidy.
  path: relative(DIST, file).replaceAll("\\", "/"),
  category: categoryOf(file),
  size: transferSize(file),
}));

// Sort the list so the biggest files come first.
// (a, b) are two files being compared. If b is bigger than a, b goes first.
files.sort((a, b) => b.size - a.size);


// -----------------------------------------------------------------------------
// REPORT A: TOTAL SIZE BY CATEGORY
// -----------------------------------------------------------------------------
// Answers: "Is the weight mostly videos, images or code?"
console.log("\n=== A. Total download size by category (everything in dist/) ===");

// "totals" starts empty and fills up like { video: 25000000, image: 5000000 }.
const totals = {};
for (const f of files) {
  // Add this file's size to its category's running total. The "?? 0" means
  // "if this category has no total yet, start from 0".
  totals[f.category] = (totals[f.category] ?? 0) + f.size;
}

// Print one line per category. ".padEnd(8)" adds spaces so the numbers line up.
for (const [category, bytes] of Object.entries(totals)) {
  console.log(`  ${category.padEnd(8)} ${toMB(bytes)}`);
}

// Print the grand total: add up every file's size.
// ".reduce" walks through the list keeping a running sum.
console.log(
  `  ${"TOTAL".padEnd(8)} ${toMB(files.reduce((sum, f) => sum + f.size, 0))}`
);


// -----------------------------------------------------------------------------
// REPORT B: THE 15 LARGEST FILES
// -----------------------------------------------------------------------------
// Answers: "Which files are the best ones to shrink?"
// The list is already sorted biggest-first, so ".slice(0, 15)" takes the first 15.
console.log("\n=== B. 15 largest files ===");
for (const f of files.slice(0, 15)) {
  console.log(`  ${toMB(f.size).padStart(9)}  ${f.path}`);
}


// -----------------------------------------------------------------------------
// REPORTS C AND E: WHICH FILES DOES THE WEBSITE ACTUALLY USE?
// -----------------------------------------------------------------------------
// Everything in the "public" folder gets copied into dist, even if no page uses
// it. Unused files do not slow visitors down (nobody requests them), but they
// make the upload bigger for no reason. And the opposite problem is worse: if
// the code asks for a file that is NOT in dist, the visitor sees a broken image.
//
// To find both, we need a list of every file path the code asks for.
//
// Step 1: find every file path written in our code.
// The pattern below finds text inside quotes that starts with "/" and ends with
// a file ending, like "/videos/AFib.mp4" or "/assets/logo.svg".
// It also finds paths built from pieces, like
// `/assets/casestudypngs/${rhythmId}-treatment.png`, where ${rhythmId} is a
// blank that the code fills in while running.
//
// How to read the pattern:  ["'`]          an opening quote mark (" or ' or `)
//                           (\/[^"'`\s]+   a "/" then any characters that are not
//                                          a quote or a space...
//                           \.[a-zA-Z0-9]+)  ...ending in "." plus letters
//                           ["'`]          a closing quote mark
const PATH_IN_QUOTES = /["'`](\/[^"'`\s]+\.[a-zA-Z0-9]+)["'`]/g;

// We search our code in src/ AND dist/index.html. The index.html is what links
// the website's own JavaScript and CSS files, so searching it makes sure those
// count as "used" too.
const filesToSearch = [...listFiles(SRC), join(DIST, "index.html")];

const referencedPaths = new Set(); // a "Set" is a list that ignores repeats
for (const file of filesToSearch) {
  const text = readFileSync(file, "utf8"); // read the file as text
  // matchAll finds every place the pattern appears. match[1] is the part in
  // the first set of brackets (the path without the quote marks).
  for (const match of text.matchAll(PATH_IN_QUOTES)) {
    referencedPaths.add(match[1]);
  }
}

// Step 2: get the real list of rhythm names the code fills the blank with.
// In CaseStudies.jsx, ${rhythmId} is filled with each rhythm's id (normal-sinus,
// atrial-fibrillation, and so on). We load the same list the website uses.
// ASSUMPTION: every blank (${...}) in a file path is a rhythm id. That is true
// today. If someone later adds a path with a different kind of blank, this
// script would need updating.
const rhythmIds = RHYTHMS.map((r) => r.id);

// Step 3: turn each path from the code into the exact list of files it asks for.
// A path with no blank asks for one file. A path with a blank asks for one file
// per rhythm, e.g. "${rhythmId}-scenario.png" becomes 9 file names.
const requestedFiles = new Set();
// index.html is what the server sends when someone opens the website's address
// (the "/" home page). No code names it, so we count it as used ourselves.
requestedFiles.add("/index.html");
for (const ref of referencedPaths) {
  if (ref.includes("${")) {
    // Replace the blank with each rhythm id in turn.
    // The /g after the pattern means "replace every blank in the text".
    for (const id of rhythmIds) {
      requestedFiles.add(ref.replace(/\$\{[^}]*\}/g, id));
    }
  } else {
    requestedFiles.add(ref);
  }
}

// Step 4: compare the two lists.
// Our files in dist are written like "videos/AFib.mp4" but the code asks for
// "/videos/AFib.mp4" with a "/" at the front, so we add one to match.
const distPaths = new Set(files.map((f) => "/" + f.path));

// REPORT C: files in dist that no code asks for.
console.log("\n=== C. Files in dist/ that nothing in the code asks for (unused) ===");
const unused = files.filter((f) => !requestedFiles.has("/" + f.path));
for (const f of unused) {
  console.log(`  ${toMB(f.size).padStart(9)}  ${f.path}`);
}
if (unused.length === 0) console.log("  none found");
console.log(
  `  ${unused.length} unused file(s), ${toMB(unused.reduce((sum, f) => sum + f.size, 0))} total` +
    `\n  Used by visitors: ${files.length - unused.length} of ${files.length} files`
);
// NOTE: this is a hint, not proof. Before deleting a file, ask the team if
// someone plans to use it, or if a printed link points at it (for example a PDF
// that is linked from somewhere outside this website).

// REPORT E: files the code asks for that are NOT in dist. These show up as
// broken images, or videos that will not play, for a visitor.
console.log("\n=== E. Files the code asks for that are MISSING from dist/ ===");
const missing = [...requestedFiles].filter((p) => !distPaths.has(p));
for (const p of missing) console.log(`  MISSING  ${p}`);
if (missing.length === 0) console.log("  none missing");


// -----------------------------------------------------------------------------
// REPORT D: HOW THE <video> TAGS ARE SET UP
// -----------------------------------------------------------------------------
// Answers: "When do the videos download: when the page opens, or only when
//           someone clicks play?"
// This matters a lot when many people open the site at the same time.
console.log("\n=== D. <video> tag settings in src/ ===");

for (const file of listFiles(SRC)) {
  const text = readFileSync(file, "utf8");

  // Search the file for an opening <video ...> tag. This pattern means:
  // "<video", then anything (including line breaks), up to the first ">".
  const tag = text.match(/<video[\s\S]*?>/);

  if (tag) {
    console.log(`  ${file.replaceAll("\\", "/")}`);
    // The tag is written across several lines. Squash all runs of spaces and
    // line breaks into a single space so it prints on one readable line.
    console.log("  " + tag[0].replace(/\s+/g, " "));
  }
}

// A short guide for reading Report D.
console.log(
  "\nHow to read this:\n" +
    '  preload="none"     -> video downloads only after someone clicks play\n' +
    '  preload="metadata" -> downloads just the first bit (length, thumbnail)\n' +
    "  autoPlay           -> starts playing on page load, so the whole video\n" +
    "                        downloads right away, whatever preload says\n"
);
