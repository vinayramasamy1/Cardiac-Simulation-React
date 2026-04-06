import React, { useEffect, useMemo, useState } from "react";
import ECGWaveform from "../components/ECGWaveform.jsx";
import { REAL_TIME_SCENARIOS } from "../data/realTimeScenarios.js";

const STATUS_STYLES = {
  stable: {
    label: "Stable",
    color: "#7ef0a5",
    background: "rgba(126,240,165,0.12)",
    borderColor: "rgba(126,240,165,0.26)",
  },
  unstable: {
    label: "Unstable",
    color: "#ffd479",
    background: "rgba(255,212,121,0.12)",
    borderColor: "rgba(255,212,121,0.24)",
  },
  urgent: {
    label: "Urgent",
    color: "#ffb36b",
    background: "rgba(255,179,107,0.12)",
    borderColor: "rgba(255,179,107,0.26)",
  },
  critical: {
    label: "Critical",
    color: "#ff9c9c",
    background: "rgba(255,140,140,0.12)",
    borderColor: "rgba(255,140,140,0.26)",
  },
};

function buildInitialState(scenario) {
  return {
    stepId: scenario.initialStepId,
    patientStatus: scenario.initialStatus,
    actionLog: [],
    feedback: null,
    outcome: null,
    secondsLeft: scenario.steps[scenario.initialStepId].timeLimit,
    currentRhythmId: scenario.rhythmId,
  };
}

export default function RealTimeMode() {
  const [selectedScenarioId, setSelectedScenarioId] = useState(REAL_TIME_SCENARIOS[0]?.id ?? "");
  const selectedScenario = useMemo(
    () => REAL_TIME_SCENARIOS.find((scenario) => scenario.id === selectedScenarioId) || REAL_TIME_SCENARIOS[0],
    [selectedScenarioId]
  );

  const [simulationState, setSimulationState] = useState(() => buildInitialState(selectedScenario));

  const currentStep =
    selectedScenario?.steps?.[simulationState.stepId] ||
    selectedScenario?.steps?.[selectedScenario.initialStepId];
  const statusStyle = STATUS_STYLES[simulationState.patientStatus] || STATUS_STYLES.stable;
  const isScenarioFinished = simulationState.outcome !== null;

  useEffect(() => {
    setSimulationState(buildInitialState(selectedScenario));
  }, [selectedScenario]);

  useEffect(() => {
    if (isScenarioFinished) {
      return undefined;
    }

    const timer = setInterval(() => {
      setSimulationState((currentState) => {
        if (currentState.outcome !== null) {
          return currentState;
        }

        if (currentState.secondsLeft > 1) {
          return { ...currentState, secondsLeft: currentState.secondsLeft - 1 };
        }

        const timeoutResult = selectedScenario.steps[currentState.stepId].timeout;
        const nextStepId = timeoutResult.nextStepId || currentState.stepId;
        const nextStep = selectedScenario.steps[nextStepId];

        return {
          ...currentState,
          stepId: nextStepId,
          patientStatus: timeoutResult.nextStatus || currentState.patientStatus,
          feedback: {
            status: "incorrect",
            text: timeoutResult.feedback,
          },
          outcome: timeoutResult.outcome || null,
          secondsLeft: timeoutResult.outcome ? 0 : nextStep.timeLimit,
          currentRhythmId: timeoutResult.nextRhythmId || currentState.currentRhythmId,
          actionLog: [
            ...currentState.actionLog,
            {
              label: "No action taken",
              result: "Timed out",
            },
          ],
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isScenarioFinished, selectedScenario]);

  function handleScenarioChange(scenarioId) {
    const nextScenario =
      REAL_TIME_SCENARIOS.find((scenario) => scenario.id === scenarioId) || REAL_TIME_SCENARIOS[0];

    setSimulationState(buildInitialState(nextScenario));
    setSelectedScenarioId(scenarioId);
  }

  function handleRestartScenario() {
    setSimulationState(buildInitialState(selectedScenario));
  }

  function handleAction(action) {
    if (isScenarioFinished) {
      return;
    }

    setSimulationState((currentState) => {
      const nextStepId = action.nextStepId || currentState.stepId;
      const nextStep = selectedScenario.steps[nextStepId];

      return {
        ...currentState,
        stepId: nextStepId,
        patientStatus: action.nextStatus || currentState.patientStatus,
        feedback: {
          status: action.isCorrect ? "correct" : "incorrect",
          text: action.feedback,
        },
        outcome: action.outcome || null,
        secondsLeft: action.outcome ? 0 : nextStep.timeLimit,
        currentRhythmId: action.nextRhythmId || currentState.currentRhythmId,
        actionLog: [
          ...currentState.actionLog,
          {
            label: action.label,
            result: action.isCorrect ? "Correct" : "Incorrect",
          },
        ],
      };
    });
  }

  return (
    <section className="page">
      <div className="hero">
        <h1 className="hero__title">Real Time Mode</h1>
        <p className="hero__sub">
          Work through time-sensitive cardiac scenarios and choose the next best action before the
          patient condition worsens.
        </p>
      </div>

      <div className="sim-grid" style={{ marginTop: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="sim-head">
            <div>
              <h2 className="sim-title" style={{ fontSize: 28 }}>{selectedScenario.title}</h2>
              <div className="sim-meta">
                {selectedScenario.patient.name}, age {selectedScenario.patient.age} |{" "}
                {selectedScenario.patient.condition}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
              <div
                className="badge"
                style={{
                  color: statusStyle.color,
                  borderColor: statusStyle.borderColor,
                  background: statusStyle.background,
                }}
              >
                Status | {statusStyle.label}
              </div>
              <div className="badge">Timer | {simulationState.secondsLeft}s</div>
            </div>
          </div>

          <div
            className="canvas"
            aria-label="Real time simulation area"
            style={{ minHeight: 560, padding: 24, background: "#121218" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              <ECGWaveform
                rhythmId={simulationState.currentRhythmId}
                isPlaying={!isScenarioFinished}
                speed={1}
                height={250}
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.4fr 1fr",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.04)",
                    padding: 18,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      marginBottom: 10,
                    }}
                  >
                    Scenario Description
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10 }}>
                    {currentStep.title}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.7, maxWidth: "62ch" }}>
                    {currentStep.description}
                  </div>

                  {simulationState.feedback ? (
                    <div
                      style={{
                        marginTop: 16,
                        borderRadius: 16,
                        border: `1px solid ${
                          simulationState.feedback.status === "correct"
                            ? "rgba(126,240,165,0.22)"
                            : "rgba(255,156,156,0.22)"
                        }`,
                        background:
                          simulationState.feedback.status === "correct"
                            ? "rgba(126,240,165,0.08)"
                            : "rgba(255,156,156,0.08)",
                        padding: 14,
                      }}
                    >
                      <div style={{ fontWeight: 700, marginBottom: 6 }}>
                        {simulationState.feedback.status === "correct" ? "Correct" : "Incorrect"}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.8)", lineHeight: 1.6 }}>
                        {simulationState.feedback.text}
                      </div>
                    </div>
                  ) : null}
                </div>

                <div
                  style={{
                    borderRadius: 18,
                    border: "1px solid rgba(255,255,255,0.10)",
                    background: "rgba(255,255,255,0.04)",
                    padding: 18,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.5)",
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                    }}
                  >
                    Action Panel
                  </div>

                  {isScenarioFinished ? (
                    <div
                      style={{
                        borderRadius: 16,
                        border: "1px solid rgba(255,255,255,0.10)",
                        background: "rgba(0,0,0,0.18)",
                        padding: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div style={{ fontSize: 22, fontWeight: 700 }}>
                        {simulationState.outcome === "success" ? "Scenario Success" : "Scenario Failed"}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.76)", lineHeight: 1.6 }}>
                        {simulationState.outcome === "success"
                          ? "Your decisions improved patient status and moved the case toward a stable rhythm."
                          : "The patient deteriorated because the scenario was not managed appropriately in time."}
                      </div>
                      <button
                        type="button"
                        className="sidebar__btn"
                        style={{ marginTop: 4 }}
                        onClick={handleRestartScenario}
                      >
                        Restart Scenario
                      </button>
                    </div>
                  ) : (
                    currentStep.actions.map((action) => (
                      <button
                        key={action.id}
                        type="button"
                        className="sidebar__btn"
                        style={{
                          marginTop: 0,
                          textAlign: "left",
                          padding: "14px 16px",
                          background: "rgba(255,255,255,0.06)",
                        }}
                        onClick={() => handleAction(action)}
                      >
                        {action.label}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="panel" aria-label="Real time mode details">
          <div className="panel__head">Simulation Setup</div>
          <div className="panel__body">
            <div className="kv">
              <span>Scenario</span>
              <strong>{selectedScenario.title}</strong>
            </div>
            <div className="kv">
              <span>Rhythm</span>
              <strong>{simulationState.currentRhythmId}</strong>
            </div>
            <div className="kv">
              <span>Status</span>
              <strong>{statusStyle.label}</strong>
            </div>

            <div className="panel__head" style={{ margin: "8px -14px 0" }}>
              Scenario Select
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {REAL_TIME_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  className="sidebar__btn"
                  style={{
                    marginTop: 0,
                    textAlign: "left",
                    background:
                      scenario.id === selectedScenario.id
                        ? "linear-gradient(135deg, rgba(90,34,49,0.55), rgba(125,49,71,0.35))"
                        : "rgba(255,255,255,0.06)",
                  }}
                  onClick={() => handleScenarioChange(scenario.id)}
                >
                  {scenario.title}
                </button>
              ))}
            </div>

            <button type="button" className="sidebar__btn sidebar__btn--ghost" onClick={handleRestartScenario}>
              Restart Current Scenario
            </button>

            <div className="panel__head" style={{ margin: "8px -14px 0" }}>
              Action Summary
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {simulationState.actionLog.length === 0 ? (
                <div style={{ color: "rgba(255,255,255,0.66)", lineHeight: 1.6, fontSize: 13 }}>
                  No actions taken yet. Make a decision before the timer runs out.
                </div>
              ) : (
                simulationState.actionLog.map((entry, index) => (
                  <div
                    key={`${entry.label}-${index}`}
                    style={{
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      padding: "10px 12px",
                    }}
                  >
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{entry.label}</div>
                    <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13 }}>{entry.result}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
