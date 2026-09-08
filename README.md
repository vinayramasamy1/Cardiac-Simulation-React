# EPICS Cardiac Simulator

The EPICS Cardiac Simulator is a browser-based cardiac rhythm training application built with React and Vite. It combines rhythm reference material, animated rhythm simulations, live ECG-style waveforms, patient case studies, knowledge reviews, and timed decision scenarios in one learning interface.

The project is intended for emergency medical and fire-service learners, instructors, EPICS team members, contributors, and anyone practicing foundational rhythm recognition and cardiac-response decisions. It is an educational tool—not a diagnostic device or a substitute for local protocols, clinical judgment, or formal medical training.

Repository: [github.com/vinayramasamy1/Cardiac-Simulation-React](https://github.com/vinayramasamy1/Cardiac-Simulation-React)

## Current User Experience

The home page links to four main learning areas: Rhythms, EKG Waveforms, Case Studies, and Reviews. A shared top navigation bar and collapsible rhythm sidebar provide access throughout the application.

Learners can open a rhythm-specific video module, compare animated ECG waveform patterns, read rhythm characteristics, work through structured patient cases, answer review questions with immediate feedback, or enter Real Time Mode for timed branching decisions and patient outcomes.

## Current Features

### Rhythm library and video simulations

- Nine selectable rhythm modules:
  - Normal Sinus Rhythm (NSR)
  - Atrial Fibrillation (AFib)
  - Ventricular Fibrillation (VFib)
  - Atrial Flutter (AFL)
  - Sinus Tachycardia (STach)
  - Ventricular Tachycardia (VTach)
  - Supraventricular Tachycardia (SVT)
  - Wolff-Parkinson-White (WPW)
  - Ectopic Atrial Rhythm (EAR)
- Rhythm cards with reference images, names, abbreviations, and short descriptions.
- Dedicated simulator routes at `/sim/:id`.
- Rhythm-specific MP4 animation playback with autoplay, looping, muted audio, and inline playback.
- Video speed choices of `1x`, `0.75x`, `0.5x`, and `0.25x`.
- A centralized rhythm-to-video configuration in `src/data/rhythmVideos.js`.

### EKG Waveforms

- Animated SVG waveform patterns generated in the browser for all nine library rhythms.
- Rhythm selection without leaving the waveform workspace.
- Play, pause, reset, and `0.5x`–`2x` waveform speed controls.
- Fixed, ranged, or unstable BPM displays based on rhythm metadata.
- Rhythm-specific waveform characteristics and explanatory details.
- Independently collapsible rhythm and information panels.

### Case Studies

- A selectable case for each of the nine rhythm-library entries.
- Structured patient information, situation summaries, and key findings.
- Scenario and treatment views with hover and click selection.
- Treatment images for NSR, AFib, VFib, atrial flutter, sinus tachycardia, VTach, SVT, and WPW.
- A collapsible case-study list.
- Graceful placeholder messaging when a treatment image is unavailable.

### Reviews and quizzes

- Three review categories: Heart Anatomy, Medication, and Heart Conditions.
- Ten multiple-choice questions per category, for 30 questions total.
- Immediate correct/incorrect state styling.
- Choice-specific explanations, including feedback for incorrect answers.
- Quiz reset and category navigation controls.

### Real Time Mode

- Timed, multi-step scenarios with branching actions, success/failure outcomes, and changing patient status.
- Live countdowns, scenario switching, restart controls, action history, and an end-of-scenario summary.
- Animated ECG waveforms that can change as the simulated patient responds.
- Six implemented scenarios:
  - Ventricular Fibrillation Arrest
  - Pulseless Electrical Activity (PEA)
  - Supraventricular Tachycardia
  - Symptomatic Bradycardia
  - Sinus Tachycardia
  - Atrial Fibrillation with Rapid Ventricular Response (RVR)

### Ectopic Atrial Rhythm support

EAR is represented in the rhythm library, sidebar, simulator, centralized video map, ECG waveform viewer, BPM metadata, rhythm characteristics, and case-study scenario. Its simulator uses the dedicated `public/videos/ectopic_atrial.mp4` animation. A dedicated EAR treatment image is not currently present, so the Treatment view displays the built-in missing-asset message.

### Interface and accessibility details

- Responsive card, quiz, simulator, waveform, and case-study layouts.
- Active navigation and selection states.
- Semantic labels and ARIA attributes on major navigation and interactive regions.
- Route-specific not-found handling for unknown pages and rhythm modules.

## How It Works

The application is a client-side React app. `BrowserRouter` selects the page for the current URL, while `Shell` supplies the shared top bar, rhythm sidebar, and main content area.

Most learning content is data-driven:

- `rhythms.js` defines the rhythm catalog, display metadata, reference images, and BPM information.
- `rhythmVideos.js` maps each rhythm ID to one MP4 file.
- `reviewQuestions.js` contains quiz categories, answers, and feedback.
- `realTimeScenarios.js` defines scenario steps, timers, actions, transitions, and outcomes.

The standard rhythm simulator uses HTML video assets. The EKG Waveforms and Real Time Mode pages instead use the reusable `ECGWaveform` component, which draws and animates SVG paths with `requestAnimationFrame`. Application state is held in React for the current browser session; there is no backend, login, database, or saved learner-progress system.

## Tech Stack

| Area | Technology |
| --- | --- |
| UI | React 19, React DOM 19 |
| Routing | React Router DOM 7 |
| Build and development | Vite 7 with `@vitejs/plugin-react` |
| Language | JavaScript with JSX and ES modules |
| Styling | CSS, responsive media queries, and component-level inline styles |
| Visualization | SVG and `requestAnimationFrame` |
| Media | Native HTML5 video with MP4 assets |
| Code quality | ESLint 9 with React Hooks and React Refresh rules |

## Getting Started

### Prerequisites

- A current Node.js LTS release
- npm (included with Node.js)
- Git

### Install and run

1. Clone the repository:

   ```bash
   git clone https://github.com/vinayramasamy1/Cardiac-Simulation-React.git
   ```

2. Enter the project directory:

   ```bash
   cd Cardiac-Simulation-React
   ```

3. Install the locked project dependencies:

   ```bash
   npm install
   ```

4. Start the Vite development server:

   ```bash
   npm run dev
   ```

5. Open the URL printed by Vite. It is normally [http://localhost:5173](http://localhost:5173); Vite will print a different port if `5173` is already in use.

### Available commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint across the project
```

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Main dashboard |
| `/rhythms` | Rhythm card library |
| `/sim/:id` | Rhythm-specific video simulator |
| `/ekg-waveforms` | Interactive SVG waveform workspace |
| `/case-studies` | Patient scenarios and treatment visuals |
| `/reviews` | Review category selection |
| `/reviews/:category` | Multiple-choice review quiz |
| `/real-time-mode` | Timed branching simulations |

## Project Structure

```text
Cardiac-Simulation-React/
├── public/
│   ├── assets/                  # Icons, ECG images, case-study media, and reference PDFs
│   └── videos/                  # Current and retained rhythm animation videos
├── src/
│   ├── components/              # ECGWaveform and RhythmCard
│   ├── data/                    # Rhythms, video paths, quizzes, and scenarios
│   ├── layout/                  # Shared shell, top navigation, and sidebar
│   ├── pages/                   # Route-level screens
│   ├── styles/                  # Global and case-study CSS
│   ├── App.jsx                  # Route definitions
│   └── main.jsx                 # React entry point
├── package.json                 # Scripts and direct dependencies
└── vite.config.js               # Vite React configuration
```

Good starting points for new contributors are `src/App.jsx` for navigation, `src/data/` for learning content, `src/pages/` for individual experiences, and `src/components/ECGWaveform.jsx` for waveform rendering.

## Rhythm Videos and Assets

Video files live in `public/videos/` and are served from URLs beginning with `/videos/`. The active file for each rhythm is selected in one place:

```js
// src/data/rhythmVideos.js
export const RHYTHM_VIDEO_PATHS = {
  "normal-sinus": "/videos/NSR-New.mp4",
  "atrial-fibrillation": "/videos/AFib.mp4",
  "ventricular-fibrillation": "/videos/VFib.mp4",
  "atrial-flutter": "/videos/AtrialFlutter.mp4",
  "sinus-tachycardia": "/videos/STach.mp4",
  "ventricular-tachycardia": "/videos/VTach.mp4",
  "supraventricular-tachycardia": "/videos/SuperTach.mp4",
  wpw: "/videos/wolff-parkinsons-white.mp4",
  "ectopic-atrial-rhythm": "/videos/ectopic_atrial.mp4",
};
```

To change a rhythm animation, add or retain the desired file in `public/videos/` and edit only that rhythm's value in `rhythmVideos.js`. Paths and filename capitalization must match exactly for case-sensitive deployment environments.

Other static media is grouped under `public/assets/`:

- `ecg/` contains rhythm reference images used by rhythm cards.
- `casestudypngs/` contains case-study scenario and treatment images.
- `case-studies/` contains reference PDF files; the current case-study screen uses structured React content and PNG treatment assets rather than embedding these PDFs.
- Top-level SVG and PNG files support navigation and dashboard visuals.

## Development and Contribution Workflow

Before starting work, synchronize your local branch:

```bash
git pull
npm install
```

Create a focused change, avoid mixing unrelated edits, and verify it before sharing:

```bash
npm run build
npm run lint
git status
git diff
```

When the work is ready, commit and push it to the appropriate branch:

```bash
git add <changed-files>
git commit -m "Describe the change"
git push
```

Coordinate before changing shared data structures or replacing media files. Existing videos may be intentionally retained for comparison or rollback even when they are not the active mapped files.

## For New Team Members

- Clone the repository and confirm `npm run dev` opens the dashboard.
- Walk through all four home-page learning areas.
- Review `src/App.jsx` to understand the routes and shared layout.
- Read the four active data modules in `src/data/` before editing learning content.
- Check `src/data/rhythmVideos.js` before adding or switching a video.
- Run the build and lint commands before committing.
- Confirm `git diff` contains only the changes you intended.
- Ask an instructor or project lead to review clinical content changes.

## Verified Next Steps

The current simulator UI explicitly marks broader controls as unfinished and lists potential extensions for rate/conduction controls, medication-driven outcomes, anatomical hotspots, and a labeled 3D heart. The case-study UI also exposes a missing-asset placeholder for the EAR treatment visual. These are implementation gaps visible in the current codebase, not completed features.

## Educational Use Disclaimer

This project is intended for education and training only. It is not a diagnostic device and must not be used for real-world clinical decision-making.
