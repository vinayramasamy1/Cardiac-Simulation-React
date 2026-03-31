export const RHYTHMS = [
  {
    id: "normal-sinus",
    name: "Normal Sinus Rhythm",
    tag: "NSR",
    image: "/assets/ecg/normal-sinus.jpg",
    description: "Normal heart rhythm with regular rate and pattern.",
    bpm: { type: "fixed", value: 72 },
  },
  {
    id: "atrial-fibrillation",
    name: "Atrial Fibrillation",
    tag: "AFib",
    image: "/assets/ecg/atrial-fibrillation.jpg",
    description: "Irregular atrial rhythm without distinct P waves present.",
    bpm: { type: "range", min: 110, max: 150 },
  },
  {
    id: "ventricular-fibrillation",
    name: "Ventricular Fibrillation",
    tag: "VFib",
    image: "/assets/ecg/ventricular-fibrillation.jpg",
    description: "Chaotic ventricular activity producing no effective cardiac output.",
    bpm: { type: "unstable", label: "Not reliably measurable" },
  },
  {
    id: "atrial-flutter",
    name: "Atrial Flutter",
    tag: "AFL",
    image: "/assets/ecg/atrial-flutter.jpg",
    description: "Rapid atrial rhythm showing classic sawtooth flutter waves.",
    bpm: { type: "fixed", value: 150 },
  },

  {
    id: "sinus-tachycardia",
    name: "Sinus Tachycardia",
    tag: "STach",
    image: "/assets/ecg/sinus-tachycardia.jpg",
    description: "Elevated heart rate originating from the sinus node.",
    bpm: { type: "fixed", value: 120 },
  },

  {
    id: "ventricular-tachycardia",
    name: "Ventricular Tachycardia",
    tag: "VTach",
    image: "/assets/ecg/ventricular-tachycardia.jpg",
    description: "Fast ventricular rhythm that may rapidly become life-threatening.",
    bpm: { type: "fixed", value: 160 },
  },
  {
    id: "supraventricular-tachycardia",
    name: "Supraventricular Tachycardia",
    tag: "SVT",
    image: "/assets/ecg/supraventricular-tachycardia.jpg",
    description: "Very fast rhythm arising above the ventricles suddenly.",
    bpm: { type: "fixed", value: 180 },
  },

  {
    id: "wpw",
    name: "Wolff-Parkinson-White (WPW)",
    tag: "WPW",
    image: "/assets/ecg/wpw.jpg",
    description: "Accessory pathway causing pre-excitation and rapid tachyarrhythmias.",
    bpm: { type: "fixed", value: 95 },
  },
];
