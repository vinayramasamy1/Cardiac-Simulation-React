# Cardiac Simulation React

A React + Vite cardiac training application built for educational use in emergency medical and fire department learning environments. The app combines cardiac rhythm exploration, live ECG waveform visualization, case-based practice, quiz reviews, and time-sensitive decision training in a single interface.

Designed as a portfolio-ready front-end project, Cardiac Simulation React focuses on real-time cardiac simulation concepts, ECG recognition, structured patient scenarios, and an immersive UI optimized for repeated practice.

## 🚀 Features

- Real-time simulation mode with timed clinical decision phases and branching patient outcomes
- Live ECG waveform visualization using animated SVG rendering for supported cardiac rhythms
- Dedicated EKG Waveforms page with:
  - Rhythm selection sidebar
  - Collapsible left and right panels
  - Play, pause, speed, and reset controls
  - BPM readout and rhythm-specific characteristics
- Interactive review quizzes with instant correct/incorrect feedback
- Rhythm library featuring:
  - Normal Sinus Rhythm
  - Atrial Fibrillation
  - Ventricular Fibrillation
  - Atrial Flutter
  - Sinus Tachycardia
  - Ventricular Tachycardia
  - Supraventricular Tachycardia
  - Wolff-Parkinson-White (WPW)
- Rhythm cards that open dedicated simulator modules
- Case Studies workspace with:
  - Selectable case list
  - Structured patient scenario view
  - Treatment image support
  - Consistent canvas sizing between scenario and treatment views
- Real Time Mode scenarios currently included:
  - Ventricular Fibrillation Arrest
  - Supraventricular Tachycardia
  - Sinus Tachycardia
- Action summaries, timer-based progression, restart controls, and scenario switching
- Shared application shell with top navigation, collapsible rhythm sidebar, and route-based layout
- Responsive layouts for dashboard cards, quizzes, simulation views, and case-study panels
- Modern UI styling with glassmorphism panels, highlighted active states, and training-focused visual hierarchy

## 🆕 Recent Improvements

- Added Real Time Mode for time-sensitive cardiac intervention scenarios
- Added animated ECG waveform rendering for multiple rhythm types
- Added BPM display logic with fixed, ranged, and unstable rhythm handling
- Added waveform playback controls including play, pause, speed selection, and reset
- Improved EKG Waveforms behavior so changing rhythms resets playback to playing at 1x speed
- Improved active control highlighting so only one of Play or Pause is active at a time
- Expanded Reviews into interactive quiz categories plus a Real Time Mode entry point
- Enhanced Case Studies with structured patient information, situation, and key findings panels
- Updated layouts to support balanced 4-card rows on Home and Reviews
- Improved scenario reset logic in Real Time Mode to safely switch scenarios without crashes

## 🛠 Tech Stack

- React 19
- Vite 7
- React Router DOM 7
- JavaScript (ES Modules)
- CSS3
- SVG-based waveform rendering and icon assets
- ESLint for linting
- Vercel for deployment

## 📸 Screenshots

Add project screenshots here for a stronger GitHub presentation.

- `docs/screenshots/home.png` - Home dashboard
- `docs/screenshots/ekg-waveforms.png` - Live ECG waveform viewer
- `docs/screenshots/case-studies.png` - Case study workspace
- `docs/screenshots/reviews.png` - Interactive review quizzes
- `docs/screenshots/real-time-mode.png` - Real-time simulation mode

Example Markdown once images are available:

```md
![Home Dashboard](docs/screenshots/home.png)
![EKG Waveform Viewer](docs/screenshots/ekg-waveforms.png)
```

## ⚙️ Installation & Setup

### Prerequisites

- Node.js 18+ recommended
- npm

### Clone and install

```bash
git clone https://github.com/your-username/cardiac-simulation-react.git
cd cardiac-simulation-react
npm install
```

### Run locally

Vite development server:

```bash
npm run dev
```

If you use an `npm start` alias in your local workflow, point it to the Vite dev server:

```bash
npm start
```

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 🌐 Live Demo

[https://cardiac-simulation-react.vercel.app/](https://cardiac-simulation-react.vercel.app/)

## 📂 Project Structure

```text
src/
  components/
    ECGWaveform.jsx
    RhythmCard.jsx
  data/
    realTimeScenarios.js
    reviewQuestions.js
    rhythms.js
  layout/
    Shell.jsx
    Sidebar.jsx
    Topbar.jsx
  pages/
    Home.jsx
    Rhythms.jsx
    EKGWaveforms.jsx
    CaseStudies.jsx
    Reviews.jsx
    RealTimeMode.jsx
    Sim.jsx
    NotFound.jsx
  styles/
    main.css
    case-studies.css
```

### Key App Areas

- `Home` provides the main dashboard entry points
- `Rhythms` presents the rhythm card library
- `EKGWaveforms` contains the animated ECG viewer and playback controls
- `Sim` hosts per-rhythm simulator modules
- `CaseStudies` delivers structured patient scenarios and treatment visuals
- `Reviews` contains category-based quizzes with instant feedback
- `RealTimeMode` runs timed branching simulations with waveform support

## 🧠 Future Improvements

- Add more cardiac rhythms, arrest pathways, and treatment scenarios
- Introduce additional simulation controls such as rate, conduction, and intervention modifiers
- Add instructor mode or guided learning prompts
- Expand quiz analytics with scoring history and performance summaries
- Track learner progress across rhythms, quizzes, and scenarios
- Add audio cues, monitor alarms, and more immersive simulation feedback
- Integrate AI-assisted case generation or clinical decision coaching
- Add backend persistence for saved sessions and training data
- Support team-based simulation workflows and debrief notes

## 👤 Author

**Vinay Ramasamy**

## Disclaimer

This project is intended for educational and training purposes only. It is not a diagnostic device and should not be used for real-world clinical decision-making.
