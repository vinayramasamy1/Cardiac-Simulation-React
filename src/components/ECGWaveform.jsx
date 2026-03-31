import React, { useEffect, useId, useMemo, useRef, useState } from "react";

const VIEWBOX_WIDTH = 360;
const VIEWBOX_HEIGHT = 180;
const BASE_SPEED = 90;
const BASELINE_Y = 92;

const WAVEFORM_PATTERNS = {
  "normal-sinus": {
    cycleWidth: 180,
    points: [
      [0, BASELINE_Y],
      [20, BASELINE_Y],
      [34, 88],
      [48, BASELINE_Y],
      [68, BASELINE_Y],
      [84, 78],
      [98, BASELINE_Y],
      [122, BASELINE_Y],
      [136, BASELINE_Y],
      [148, 38],
      [158, 136],
      [170, BASELINE_Y],
      [180, BASELINE_Y],
    ],
  },
  "atrial-fibrillation": {
    cycleWidth: 160,
    points: [
      [0, 96],
      [12, 90],
      [24, 100],
      [36, 86],
      [48, 104],
      [60, 88],
      [72, 98],
      [84, 84],
      [96, 110],
      [108, 88],
      [120, 102],
      [132, 92],
      [144, 98],
      [160, 96],
    ],
  },
  "ventricular-fibrillation": {
    cycleWidth: 120,
    points: [
      [0, 100],
      [12, 56],
      [24, 126],
      [36, 48],
      [48, 132],
      [60, 64],
      [72, 122],
      [84, 52],
      [96, 136],
      [108, 58],
      [120, 104],
    ],
  },
  "atrial-flutter": {
    cycleWidth: 108,
    points: [
      [0, 96],
      [18, 84],
      [36, 72],
      [54, 96],
      [72, 84],
      [90, 72],
      [108, 96],
    ],
  },
  "sinus-tachycardia": {
    cycleWidth: 136,
    points: [
      [0, BASELINE_Y],
      [14, BASELINE_Y],
      [28, 86],
      [40, BASELINE_Y],
      [54, BASELINE_Y],
      [66, 72],
      [76, BASELINE_Y],
      [92, BASELINE_Y],
      [104, BASELINE_Y],
      [114, 28],
      [122, 138],
      [130, BASELINE_Y],
      [136, BASELINE_Y],
    ],
  },
  "ventricular-tachycardia": {
    cycleWidth: 112,
    points: [
      [0, 96],
      [18, 96],
      [34, 42],
      [50, 138],
      [66, 52],
      [82, 132],
      [98, 48],
      [112, 96],
    ],
  },
  "supraventricular-tachycardia": {
    cycleWidth: 118,
    points: [
      [0, BASELINE_Y],
      [12, BASELINE_Y],
      [24, 86],
      [34, BASELINE_Y],
      [46, BASELINE_Y],
      [56, 60],
      [64, BASELINE_Y],
      [78, BASELINE_Y],
      [88, BASELINE_Y],
      [98, 24],
      [106, 142],
      [114, BASELINE_Y],
      [118, BASELINE_Y],
    ],
  },
  wpw: {
    cycleWidth: 156,
    points: [
      [0, BASELINE_Y],
      [18, BASELINE_Y],
      [30, 88],
      [42, BASELINE_Y],
      [58, BASELINE_Y],
      [70, 74],
      [82, BASELINE_Y],
      [98, BASELINE_Y],
      [112, BASELINE_Y],
      [124, 32],
      [136, 134],
      [148, 98],
      [156, BASELINE_Y],
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
