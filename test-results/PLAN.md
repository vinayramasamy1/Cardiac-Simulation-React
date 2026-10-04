# Load test plan (based on what each page actually does)

Built from reading `src/App.jsx`, every file in `src/pages/`, and the components
they use. The whole app is ONE 118 kB JavaScript file (no code splitting), so after
the first load, moving between pages in the app downloads only that page's media.

## What each route shows and loads

| Route | What it displays | Downloads when you arrive (cache off) | Runs in the browser |
|---|---|---|---|
| `/` Home | Title + 4 icon tiles | App JS (118 kB), CSS, 6 small SVGs. **Measured: 131 kB, 3.26 s on Slow 4G** | nothing heavy |
| `/rhythms` | Grid of 9 cards: ECG thumbnail JPG + name + description | 9 JPGs from `assets/ecg/` (8 distinct; ectopic reuses normal-sinus). **~1.45 MB, 86% of it two files (afib 793 kB, normal-sinus 490 kB)** | nothing heavy |
| `/sim/:id` (9 rhythms) | Rhythm name; an autoplaying looping MP4 with speed picker; a live ECG waveform with play/pause/speed; education tabs (text) | **One MP4: 1.2 to 2.6 MB** (VTach 1.20 smallest, VFib 2.56 largest). Autoplay means the whole video downloads at once. | **Heaviest page for the visitor's computer:** video decoding + a 60-per-second React redraw of the SVG waveform |
| `/ekg-waveforms` | Rhythm picker, one big live ECG waveform, speed + flutter controls, explanatory text | No media; waveform is drawn in code | 60-per-second waveform redraw |
| `/case-studies` | 9 cases. Scenario view = text. Treatment view = a PNG. | **All 9 treatment PNGs + 9 scenario PNGs download up front in hidden tags: ~6.4 MB** (the browser loads hidden images). Switching cases afterward downloads nothing new. | light |
| `/reviews` | 3 category tiles + a "Real Time Mode" tile | A few SVG icons | light |
| `/reviews/:category` (3) | Multiple-choice quiz, text only | Nothing new | light |
| `/real-time-mode` | Timed scenario with countdown, choices, one live ECG waveform | Nothing new (103 scenario entries are in the JS) | 1 s timer + 60-per-second waveform redraw |
| anything else | "Page not found" | Nothing | nothing |

Not linked from the top bar: `/real-time-mode` (reached from the Reviews page).

## Part 1: Network test (DevTools, Slow 4G, Disable cache)

For each row: click Clear, navigate, wait until finished, screenshot the bottom bar
(requests / transferred / Finish). Save to `test-results/network-throttle/`.

| # | Page | Why it is in the plan | Status |
|---|---|---|---|
| 1 | Home | Baseline cost of arriving | DONE (131 kB, 3.26 s) |
| 2 | Rhythms | Biggest images; first thing visitors see after Home | rows seen, need bottom-bar totals |
| 3 | Sim, largest video (`/sim/ventricular-fibrillation`) | Worst-case download | |
| 4 | Sim, smallest video (`/sim/ventricular-tachycardia`) | Best case; shows the range | |
| 5 | Sim, switch rhythms from the sidebar | Does switching re-download? | |
| 6 | EKG Waveforms | Expect tiny; confirms no hidden media | |
| 7 | Case Studies | Expect ~6.4 MB; the biggest single page | |
| 8 | Case Studies, click through all 9 cases | Confirms no further downloads | |
| 9 | Reviews, one quiz, Real Time Mode | Expect tiny; confirms | |
| 10 | One hard reload on a deep link, e.g. `/sim/wpw` | What a shared link costs (all JS + video) | |

For each, note: transferred MB, finish time, and what the page looked like while
loading (blank areas, stalled video).

## Part 2: Visitor-computer test (this is NOT a server test)

The waveform is redrawn by React about 60 times per second, and the Sim page also
decodes a video. Old station computers may struggle even if the server is fine.

| # | Test | How | What to record |
|---|---|---|---|
| 11 | One Sim page, 2 minutes | Task Manager (Ctrl+Shift+Esc), find the Chrome tab process | CPU %, memory |
| 12 | EKG Waveforms, 2 minutes | same | CPU %, memory |
| 13 | Many tabs | Open 10 tabs on `/sim/atrial-fibrillation`, then 20 | CPU %, memory, does it stutter |
| 14 | CPU throttling | DevTools > Performance > CPU: 4x slowdown (about a low-end laptop) on Sim | Does video/waveform stutter |

## Part 3: Server load test (k6) after Parts 1 and 2

Only worth running once we know real per-page weights. A realistic visitor session
(first visit, cache empty) is Home, Rhythms, one Sim, Case Studies, about 10 MB. The
k6 script will request those exact files, in that order. It points at
`localhost:4173` as a baseline; the real number must come from running the same
script against the Fire Department's server (with IT's permission).

## Open questions for you

- Do visitors mostly use laptops/desktops at the station, or phones? This decides how
  much to weigh Part 2.
- Is the first visit the main case, or will people come back often (then the browser
  cache makes later visits far lighter)?
