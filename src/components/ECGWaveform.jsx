import React, { useEffect, useId, useMemo, useRef, useState } from "react";

const VIEWBOX_WIDTH = 360;
const VIEWBOX_HEIGHT = 180;
const BASE_SPEED = 90;
const BASELINE_Y = 92;

const WAVEFORM_PATTERNS = {
  "normal-sinus": {
    cycleWidth: 188,
    points: [
      [0, BASELINE_Y],
      [18, BASELINE_Y],
      [30, 89],
      [40, 84],
      [50, 89],
      [60, BASELINE_Y],
      [76, BASELINE_Y],
      [88, 98],
      [94, 34],
      [100, 138],
      [108, 90],
      [122, BASELINE_Y],
      [138, 86],
      [152, 78],
      [166, 84],
      [180, 90],
      [188, BASELINE_Y],
    ],
  },
  "atrial-fibrillation": {
    cycleWidth: 172,
    points: [
      [0, 94],
      [10, 90],
      [20, 96],
      [30, 88],
      [40, 98],
      [50, 90],
      [60, 96],
      [70, 92],
      [80, 100],
      [88, 46],
      [96, 134],
      [104, 92],
      [116, 98],
      [126, 90],
      [136, 96],
      [146, 88],
      [156, 97],
      [164, 91],
      [172, 94],
    ],
  },
  "ventricular-fibrillation": {
    cycleWidth: 126,
    points: [
      [0, 100],
      [10, 70],
      [20, 118],
      [30, 54],
      [40, 132],
      [52, 62],
      [64, 124],
      [76, 76],
      [88, 136],
      [100, 66],
      [112, 120],
      [126, 94],
    ],
  },
  "atrial-flutter": {
    cycleWidth: 156,
    points: [
      [0, 96],
      [12, 84],
      [24, 72],
      [36, 96],
      [48, 84],
      [60, 72],
      [72, 96],
      [84, 84],
      [96, 72],
      [108, 96],
      [118, 100],
      [124, 46],
      [130, 134],
      [138, 92],
      [148, 82],
      [156, 90],
    ],
  },
  "sinus-tachycardia": {
    cycleWidth: 126,
    points: [
      [0, BASELINE_Y],
      [10, BASELINE_Y],
      [20, 88],
      [28, 84],
      [36, 89],
      [44, BASELINE_Y],
      [56, BASELINE_Y],
      [66, 98],
      [72, 32],
      [78, 140],
      [86, 90],
      [98, BASELINE_Y],
      [108, 84],
      [118, 80],
      [126, BASELINE_Y],
    ],
  },
  "ventricular-tachycardia": {
    cycleWidth: 116,
    points: [
      [0, 96],
      [12, 96],
      [26, 58],
      [44, 132],
      [62, 46],
      [80, 128],
      [98, 54],
      [116, 96],
    ],
  },
  "supraventricular-tachycardia": {
    cycleWidth: 92,
    points: [
      [0, BASELINE_Y],
      [12, BASELINE_Y],
      [22, 98],
      [28, 44],
      [34, 134],
      [42, 92],
      [54, BASELINE_Y],
      [66, 94],
      [74, 46],
      [80, 134],
      [88, 92],
      [92, BASELINE_Y],
    ],
  },
  wpw: {
    cycleWidth: 164,
    points: [
      [0, BASELINE_Y],
      [14, BASELINE_Y],
      [24, 88],
      [34, 84],
      [44, 89],
      [50, BASELINE_Y],
      [60, 88],
      [72, 82],
      [84, 74],
      [96, 38],
      [104, 136],
      [114, 88],
      [128, BASELINE_Y],
      [142, 86],
      [154, 80],
      [164, BASELINE_Y],
    ],
  },
};

function buildContinuousPath(pattern) {
  const repeatsNeeded = Math.ceil(VIEWBOX_WIDTH / pattern.cycleWidth) + 3;
  const commands = [];

  for (let repeatIndex = -1; repeatIndex < repeatsNeeded; repeatIndex += 1) {
    pattern.points.forEach(([x, y], pointIndex) => {
      const shiftedX = x + repeatIndex * pattern.cycleWidth;
      const command = pointIndex === 0 && repeatIndex === -1 ? "M" : "L";
      commands.push(`${command}${shiftedX} ${y}`);
    });
  }

  return commands.join(" ");
}

export default function ECGWaveform({
  rhythmId = "normal-sinus",
  isPlaying = true,
  speed = 1,
  height = 280,
}) {
  const clipPathId = useId();
  const animationFrameRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [offset, setOffset] = useState(0);

  const pattern = useMemo(() => {
    return WAVEFORM_PATTERNS[rhythmId] || WAVEFORM_PATTERNS["normal-sinus"];
  }, [rhythmId]);

  const waveformPath = useMemo(() => {
    return buildContinuousPath(pattern);
  }, [pattern]);

  const loopWidth = pattern.cycleWidth;

  const centerLineRows = useMemo(() => {
    return Array.from({ length: 8 }, (_, index) => 24 + index * 18);
  }, []);

  const gridColumns = useMemo(() => {
    return Array.from({ length: 12 }, (_, index) => index * 30);
  }, [rhythmId]);

  useEffect(() => {
    setOffset(0);
    lastTimeRef.current = 0;
  }, [rhythmId, loopWidth]);

  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = 0;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return undefined;
    }

    const pixelsPerSecond = BASE_SPEED * speed;

    function animate(timestamp) {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const delta = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      setOffset((currentOffset) => {
        const nextOffset = currentOffset - pixelsPerSecond * delta;
        return nextOffset <= -loopWidth ? nextOffset + loopWidth : nextOffset;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, speed, loopWidth]);

  return (
    <div
      aria-label="Animated ECG waveform"
      style={{
        width: "100%",
        borderRadius: 22,
        border: "1px solid rgba(255,255,255,0.10)",
        background:
          "radial-gradient(900px 400px at 25% 20%, rgba(125,49,71,0.22), transparent 55%), rgba(0,0,0,0.28)",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        width="100%"
        height={height}
        role="img"
        aria-hidden="true"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id={clipPathId}>
            <rect x="0" y="0" width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} rx="22" ry="22" />
          </clipPath>
        </defs>

        <rect width={VIEWBOX_WIDTH} height={VIEWBOX_HEIGHT} fill="rgba(255,255,255,0.02)" />

        {centerLineRows.map((y, index) => (
          <line
            key={`h-${index}`}
            x1="0"
            y1={y}
            x2={VIEWBOX_WIDTH}
            y2={y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        ))}

        {gridColumns.map((x, index) => (
          <line
            key={`v-${index}`}
            x1={x}
            y1="0"
            x2={x}
            y2={VIEWBOX_HEIGHT}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}

        <g clipPath={`url(#${clipPathId})`}>
          <g transform={`translate(${offset} 0)`}>
            <path
              d={waveformPath}
              fill="none"
              stroke="#7ef0a5"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
