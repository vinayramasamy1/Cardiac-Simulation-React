// =============================================================================
// NETWORK TEST
// =============================================================================
//
// THE QUESTION THIS ANSWERS
//   "For each page of the website, how many megabytes does a visitor download,
//    and how long does it take on a slow connection?"
//
// This is the automated version of what we did by hand in Chrome DevTools: the
// Network tab with throttling turned on, reading the bar at the bottom
// ("12 requests | 1.4 MB transferred | Finish: 9.2 s").
//
// HOW IT WORKS
//   1. It opens your installed Google Chrome with no visible window.
//   2. It slows the connection down to match a chosen speed (default: Slow 4G).
//   3. It visits each page, waits until nothing is downloading any more, and
//      writes down every file that was downloaded.
//   4. It saves the results as JSON, CSV and Markdown files in test-results/runs/.
//
// HOW TO RUN IT (from the project's main folder), using TWO terminal windows:
//   Window 1:   npm run build
//               npm run preview          <- serves the website at localhost:4173
//   Window 2:   node scripts/network-test.mjs
//
// OPTIONS (all optional, add them after the command):
//   --profile slow4g|fast4g|none   connection speed (default slow4g)
//   --only text                    run only scenarios whose name contains "text"
//                                  e.g.  --only "Sim"   or   --only "Case Studies"
//   --base http://host:port        website address (default http://localhost:4173)
//   --maxwait 90                   give up waiting for one step after 90 seconds
//
// IMPORTANT: this measures DOWNLOAD size and time. It does not measure how hard
// the visitor's computer works to draw the animations. That is a separate test.
// =============================================================================


// -----------------------------------------------------------------------------
// PART 1: TOOLS WE BORROW
// -----------------------------------------------------------------------------

// "chromium" is Playwright's remote control for Chrome-type browsers.
// playwright-core is the small version of Playwright that does NOT download its
// own browser. We tell it to use the Chrome that is already installed.
import { chromium } from "playwright-core";

// Node's built-in tools for writing files and folders.
import { mkdirSync, writeFileSync } from "node:fs";

// The same list of rhythms the website uses (normal-sinus, atrial-fibrillation,
// ...). We use it so the test visits every rhythm's page without us typing them.
import { RHYTHMS } from "../src/data/rhythms.js";


// -----------------------------------------------------------------------------
// PART 2: SETTINGS AND COMMAND-LINE OPTIONS
// -----------------------------------------------------------------------------

// process.argv is the list of words typed after "node". We look for an option
// name (like --profile) and return the word right after it, or a default.
function getOption(name, defaultValue) {
  const position = process.argv.indexOf(name);
  return position === -1 ? defaultValue : process.argv[position + 1];
}

const BASE_URL = getOption("--base", "http://localhost:4173");
const PROFILE_NAME = getOption("--profile", "slow4g");
const ONLY = getOption("--only", "").toLowerCase();
// How long we wait for ONE step to finish downloading before giving up.
const MAX_WAIT_SECONDS = Number(getOption("--maxwait", "90"));

// Connection speeds. These match the presets in Chrome DevTools.
//   latency  = delay before data starts arriving, in milliseconds
//   download = bytes per second the visitor can receive
//   upload   = bytes per second the visitor can send
// Network speeds are quoted in megabits per second (Mbps). 8 bits = 1 byte, so
// we divide by 8 to get bytes per second.
// The numbers are the same ones Chrome DevTools uses for its presets. DevTools
// multiplies the speeds by 0.9 and uses a larger delay than the advertised
// figure, because it adds a safety margin for overhead. Using the same numbers
// means our results can be compared directly with the DevTools screenshots.
const PROFILES = {
  slow4g: { latency: 562.5, download: (1.6 * 1000 * 1000 * 0.9) / 8, upload: (0.75 * 1000 * 1000 * 0.9) / 8 },
  fast4g: { latency: 165, download: (9 * 1000 * 1000 * 0.9) / 8, upload: (1.5 * 1000 * 1000 * 0.9) / 8 },
  none: null, // no slowdown: full speed of this computer
};
if (!(PROFILE_NAME in PROFILES)) {
  console.error(`Unknown --profile "${PROFILE_NAME}". Use slow4g, fast4g or none.`);
  process.exit(1);
}
const PROFILE = PROFILES[PROFILE_NAME];


// -----------------------------------------------------------------------------
// PART 3: THE LIST OF THINGS TO TEST ("scenarios")
// -----------------------------------------------------------------------------
// A scenario is one visit. It has a name and a list of steps. Each step is a
// small action (open a page, click a button) and gets its own measurement, so
// we can see what each action costs on top of the one before.
//
// Every scenario starts in a brand-new browser with an EMPTY cache. That means
// nothing has been downloaded before: this is a visitor's FIRST visit, which is
// the worst case for the server.

// Small helper steps, so the scenario list below stays easy to read.
const open = (path) => ({
  label: `Open ${path}`,
  // page.goto = type this address in the browser and press Enter.
  run: async (page) => page.goto(BASE_URL + path, { waitUntil: "commit" }),
});
const clickLink = (label, selector) => ({
  label,
  // .evaluate(el => el.click()) clicks the element directly even if it is
  // hidden by the page's layout (the sidebar is collapsed by default).
  run: async (page) => page.locator(selector).first().evaluate((el) => el.click()),
});

// --- Scenarios where we simply open one page directly -----------------------
const directPages = [
  ["Home", "/"],
  ["Rhythms", "/rhythms"],
  ["EKG Waveforms", "/ekg-waveforms"],
  ["Case Studies", "/case-studies"],
  ["Reviews", "/reviews"],
  ["Reviews: Heart Anatomy quiz", "/reviews/heart-anatomy"],
  ["Reviews: Medication quiz", "/reviews/medication"],
  ["Reviews: Heart Conditions quiz", "/reviews/heart-conditions"],
  ["Real Time Mode", "/real-time-mode"],
  ["Page not found", "/this-page-does-not-exist"],
];

// One scenario per rhythm simulator page (9 of them). Each one loads a
// different video, so each has a different weight.
for (const rhythm of RHYTHMS) {
  directPages.push([`Sim: ${rhythm.name}`, `/sim/${rhythm.id}`]);
}

const SCENARIOS = directPages.map(([name, path]) => ({ name, steps: [open(path)] }));

// --- Scenarios that click around, like a real person --------------------------

// A first-time visitor's full tour of the site. The total is the realistic
// "one person's first session" weight.
SCENARIOS.push({
  name: "Tour: a first visit",
  steps: [
    open("/"),
    clickLink("Click Rhythms in top bar", 'nav[aria-label="Top navigation"] a[href="/rhythms"]'),
    clickLink("Click Atrial Fibrillation card", 'a.card[href="/sim/atrial-fibrillation"]'),
    clickLink("Click Case Studies in top bar", 'nav[aria-label="Top navigation"] a[href="/case-studies"]'),
    clickLink("Click Reviews in top bar", 'nav[aria-label="Top navigation"] a[href="/reviews"]'),
  ],
});

// Does switching rhythms in the sidebar download a new video each time?
SCENARIOS.push({
  name: "Sim: switch rhythms with the sidebar",
  steps: [
    open("/sim/normal-sinus"),
    clickLink("Switch to Ventricular Fibrillation", 'a.sideitem[data-id="ventricular-fibrillation"]'),
    clickLink("Switch to Ventricular Tachycardia", 'a.sideitem[data-id="ventricular-tachycardia"]'),
  ],
});

// The Case Studies page downloads all its images up front. This checks that
// clicking through every case and viewing its Treatment image downloads
// nothing more. (A small number means the images were already there.)
SCENARIOS.push({
  name: "Case Studies: click through every case",
  steps: [
    open("/case-studies"),
    {
      label: "Open every case and its Treatment view",
      run: async (page) => {
        const buttons = page.locator(".cs-item");
        const count = await buttons.count();
        for (let i = 0; i < count; i += 1) {
          await buttons.nth(i).click();
          await page.locator(".cs-feature-btn", { hasText: "Treatment" }).click();
        }
      },
    },
  ],
});

// Apply the --only filter if one was given.
const SELECTED = SCENARIOS.filter((s) => s.name.toLowerCase().includes(ONLY));


// -----------------------------------------------------------------------------
// PART 4: RECORDING WHAT THE BROWSER DOWNLOADS
// -----------------------------------------------------------------------------
// Chrome has a built-in "DevTools Protocol" (CDP). It is the same stream of
// information the DevTools Network tab shows. We listen to it directly so our
// numbers match what you saw on screen.
//
// For each file the page asks for, CDP tells us three things:
//   requestWillBeSent  -> the browser is asking for a file (here is its address)
//   loadingFinished    -> the file arrived (here is how many bytes were sent)
//   loadingFailed      -> the request was cancelled or failed
// "encodedDataLength" is the number of bytes that travelled over the network,
// AFTER the server compressed them. That is what DevTools calls "transferred".

// Starts listening on one browser tab. Returns an object with the data it has
// collected so far, plus a way to tell it which step we are on.
async function startRecording(page, context) {
  const client = await context.newCDPSession(page); // open the CDP channel
  await client.send("Network.enable"); // start receiving network events

  if (PROFILE) {
    // Slow the connection down, like the throttle dropdown in DevTools.
    await client.send("Network.emulateNetworkConditions", {
      offline: false,
      latency: PROFILE.latency,
      downloadThroughput: PROFILE.download,
      uploadThroughput: PROFILE.upload,
    });
  }

  const recording = {
    requests: new Map(), // one entry per file asked for, keyed by request id
    inFlight: new Set(), // requests asked for but not finished yet
    lastActivity: Date.now(), // clock time of the most recent network event
    currentStep: 0, // which step the new requests belong to
  };

  client.on("Network.requestWillBeSent", (event) => {
    const url = event.request.url;
    if (url.startsWith("data:")) return; // tiny files embedded inside the page
    // A redirect reuses the same request id, so only record the first sight.
    if (!recording.requests.has(event.requestId)) {
      recording.requests.set(event.requestId, {
        url,
        type: event.type, // Document, Script, Image, Media...
        step: recording.currentStep,
        started: event.timestamp, // seconds on Chrome's own clock
        finished: null,
        bytes: 0,
      });
    }
    recording.inFlight.add(event.requestId);
    recording.lastActivity = Date.now();
  });

  client.on("Network.loadingFinished", (event) => {
    const entry = recording.requests.get(event.requestId);
    if (entry) {
      entry.finished = event.timestamp;
      entry.bytes = event.encodedDataLength;
    }
    recording.inFlight.delete(event.requestId);
    recording.lastActivity = Date.now();
  });

  client.on("Network.loadingFailed", (event) => {
    const entry = recording.requests.get(event.requestId);
    if (entry) entry.finished = event.timestamp;
    recording.inFlight.delete(event.requestId);
    recording.lastActivity = Date.now();
  });

  return recording;
}

// Waits until the page has stopped downloading. "Stopped" means: nothing is
// in flight AND nothing new has been asked for during the last 700 ms.
// If that has not happened after MAX_WAIT_SECONDS we stop waiting and mark the
// step as "timed out" so the numbers are not mistaken for a finished load.
async function waitUntilIdle(recording) {
  const deadline = Date.now() + MAX_WAIT_SECONDS * 1000;
  while (Date.now() < deadline) {
    const quiet = Date.now() - recording.lastActivity >= 700;
    if (recording.inFlight.size === 0 && quiet) return true; // finished
    await new Promise((resolve) => setTimeout(resolve, 100)); // check again soon
  }
  return false; // timed out
}


// -----------------------------------------------------------------------------
// PART 5: RUN ONE SCENARIO
// -----------------------------------------------------------------------------
async function runScenario(browser, scenario) {
  // A new "context" is like a brand-new browser profile: empty cache, no
  // cookies, nothing remembered. That is what a first-time visitor has.
  const context = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const page = await context.newPage();
  const recording = await startRecording(page, context);

  const stepResults = [];
  for (let i = 0; i < scenario.steps.length; i += 1) {
    const step = scenario.steps[i];
    recording.currentStep = i; // new requests from now on belong to this step

    await step.run(page); // do the action (open a page or click something)

    // Pause briefly before checking for "idle". After a click, the page needs a
    // moment to draw the new screen and only THEN asks for its images and
    // videos. Without this pause the check would see "nothing downloading yet",
    // decide the step was finished, and the downloads would be wrongly counted
    // under the NEXT step (or cancelled by the next click).
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const finishedCleanly = await waitUntilIdle(recording);

    // Add up the files that belong to this step.
    const files = [...recording.requests.values()].filter((r) => r.step === i);
    const totalBytes = files.reduce((sum, f) => sum + f.bytes, 0);
    // "Finish" matches DevTools: time from the first request starting to the
    // last one completing. Chrome's clock counts in seconds.
    const starts = files.map((f) => f.started);
    const ends = files.map((f) => f.finished ?? f.started);
    const finishSeconds = files.length ? Math.max(...ends) - Math.min(...starts) : 0;

    const sorted = [...files].sort((a, b) => b.bytes - a.bytes);
    stepResults.push({
      step: step.label,
      requests: files.length,
      transferredBytes: totalBytes,
      finishSeconds: Number(finishSeconds.toFixed(2)),
      timedOut: !finishedCleanly,
      // The five largest files in this step, so we can see what is heavy.
      biggestFiles: sorted.slice(0, 5).map((f) => ({
        file: f.url.replace(BASE_URL, ""),
        bytes: f.bytes,
      })),
    });
  }

  await context.close(); // throw the browser profile away
  return { scenario: scenario.name, steps: stepResults };
}


// -----------------------------------------------------------------------------
// PART 6: RUN EVERYTHING AND SAVE THE RESULTS
// -----------------------------------------------------------------------------
const toMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);

async function main() {
  // Make sure the website is actually running before we start.
  try {
    await fetch(BASE_URL);
  } catch {
    console.error(`Cannot reach ${BASE_URL}. Start the website first with:`);
    console.error("  npm run build   and then   npm run preview");
    process.exit(1);
  }

  if (SELECTED.length === 0) {
    console.error(`No scenario name contains "${ONLY}".`);
    process.exit(1);
  }

  console.log(`Connection: ${PROFILE_NAME}   Website: ${BASE_URL}`);
  console.log(`Running ${SELECTED.length} scenario(s). Slow connections take a while.\n`);

  // channel "chrome" means: use the Google Chrome that is installed on this
  // computer. headless means: no window.
  const browser = await chromium.launch({ channel: "chrome", headless: true });

  const results = [];
  for (let i = 0; i < SELECTED.length; i += 1) {
    const scenario = SELECTED[i];
    process.stdout.write(`[${i + 1}/${SELECTED.length}] ${scenario.name} ... `);
    const result = await runScenario(browser, scenario);
    results.push(result);
    const total = result.steps.reduce((sum, s) => sum + s.transferredBytes, 0);
    console.log(`${toMB(total)} MB`);
  }
  await browser.close();

  // ---- Save the results ----------------------------------------------------
  // File names include the date and time so runs never overwrite each other and
  // can be compared later (for example before and after shrinking the images).
  const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const folder = "test-results/runs";
  mkdirSync(folder, { recursive: true });
  const base = `${folder}/network-${PROFILE_NAME}-${stamp}`;

  // 1) JSON: the complete data, including the biggest files in each step.
  writeFileSync(
    `${base}.json`,
    JSON.stringify({ profile: PROFILE_NAME, baseUrl: BASE_URL, ranAt: stamp, results }, null, 2)
  );

  // 2) CSV: one row per step. Opens in Excel or Google Sheets.
  const csvRows = [["scenario", "step", "requests", "transferred_mb", "finish_seconds", "timed_out", "biggest_file", "biggest_file_mb"]];
  // 3) Markdown: the same rows as a table you can read or paste anywhere.
  const mdRows = [
    `# Network test (${PROFILE_NAME}) ${stamp}`,
    "",
    "| Scenario | Step | Requests | Transferred (MB) | Finish (s) | Biggest file |",
    "|---|---|---|---|---|---|",
  ];
  for (const r of results) {
    for (const s of r.steps) {
      const big = s.biggestFiles[0];
      const bigText = big ? `${big.file} (${toMB(big.bytes)} MB)` : "-";
      const flag = s.timedOut ? " TIMED OUT" : "";
      csvRows.push([r.scenario, s.step, s.requests, toMB(s.transferredBytes), s.finishSeconds, s.timedOut, big ? big.file : "", big ? toMB(big.bytes) : ""]);
      mdRows.push(`| ${r.scenario} | ${s.step} | ${s.requests} | ${toMB(s.transferredBytes)} | ${s.finishSeconds}${flag} | ${bigText} |`);
    }
  }
  // Wrap every CSV value in quotes so commas inside names do not break columns.
  writeFileSync(`${base}.csv`, csvRows.map((row) => row.map((v) => `"${v}"`).join(",")).join("\n"));
  writeFileSync(`${base}.md`, mdRows.join("\n") + "\n");

  console.log(`\nSaved:\n  ${base}.json\n  ${base}.csv\n  ${base}.md`);
}

main();
