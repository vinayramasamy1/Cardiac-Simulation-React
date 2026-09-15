// Pure helpers for generating a parametric atrial-flutter waveform cycle
// and its corresponding ventricular rate. Kept out of ECGWaveform.jsx so
// that file only exports the component (required for React Fast Refresh).

const FLUTTER_TOOTH_WIDTH = 36;
// Offsets (relative to the end of the last flutter tooth) for the QRS
// complex that follows the flutter waves, reusing the original hand-authored
// spike shape.
const FLUTTER_QRS_OFFSETS = [
  [0, 96],
  [10, 100],
  [16, 46],
  [22, 134],
  [30, 92],
  [40, 82],
  [48, 90],
];

// Builds one atrial-flutter cycle with `humpCount` sawtooth flutter waves
// before the conducted QRS complex. `humpCount` corresponds to the number of
// non-conducted flutter waves between beats (e.g. 1 hump = 2:1 block).
export function buildAtrialFlutterPattern(humpCount) {
  const teeth = Math.max(1, Math.round(humpCount));
  const points = [];

  for (let toothIndex = 0; toothIndex < teeth; toothIndex += 1) {
    const x0 = toothIndex * FLUTTER_TOOTH_WIDTH;
    points.push([x0, 96]);
    points.push([x0 + 12, 84]);
    points.push([x0 + 24, 72]);
  }

  const teethEndX = teeth * FLUTTER_TOOTH_WIDTH;
  FLUTTER_QRS_OFFSETS.forEach(([dx, y]) => points.push([teethEndX + dx, y]));

  return { cycleWidth: teethEndX + 48, points };
}

// Ventricular rate for atrial flutter: atrial rate is ~300 bpm, and one QRS
// conducts for every (humpCount + 1) flutter waves.
export function computeAtrialFlutterBpm(humpCount) {
  const teeth = Math.max(1, Math.round(humpCount));
  return Math.round(300 / (teeth + 1));
}
