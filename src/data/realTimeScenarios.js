export const REAL_TIME_SCENARIOS = [
  {
    id: "vfib-arrest",
    title: "Ventricular Fibrillation Arrest",
    patient: {
      name: "Thomas Reed",
      age: 58,
      condition: "Collapsed at home, unresponsive on crew arrival",
    },
    rhythmId: "ventricular-fibrillation",
    initialStatus: "critical",
    initialStepId: "arrival",
    steps: {
      arrival: {
        id: "arrival",
        title: "Arrival",
        description:
          "The patient is pulseless and apneic. Bystander CPR has not started. You need to take the first lifesaving action immediately.",
        timeLimit: 24,
        actions: [
          {
            id: "start-cpr",
            label: "Start CPR",
            feedback: "Correct. High-quality CPR is the right first action while preparing the defibrillator.",
            nextStepId: "shock-ready",
            nextStatus: "critical",
            isCorrect: true,
          },
          {
            id: "check-history",
            label: "Ask family for history",
            feedback: "Incorrect. Gathering history delays immediate resuscitation in a pulseless arrest.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "oxygen-only",
            label: "Apply oxygen only",
            feedback: "Incorrect. Oxygen alone does not treat ventricular fibrillation without compressions and defibrillation.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delayed intervention in VFib causes rapid deterioration.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      "shock-ready": {
        id: "shock-ready",
        title: "Shockable Rhythm",
        description:
          "CPR is in progress and the monitor confirms ventricular fibrillation. The defibrillator is charged and ready.",
        timeLimit: 22,
        actions: [
          {
            id: "deliver-shock",
            label: "Deliver shock",
            feedback: "Correct. Early defibrillation is the key intervention for ventricular fibrillation.",
            nextStepId: "post-shock",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "continue-observing",
            label: "Continue observing rhythm",
            feedback: "Incorrect. Observation alone delays definitive treatment for a shockable arrest rhythm.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "give-nitro",
            label: "Give nitroglycerin",
            feedback: "Incorrect. Nitroglycerin is not appropriate for a pulseless VFib arrest.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delay to shock lowers the chance of return of circulation.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      "post-shock": {
        id: "post-shock",
        title: "Post-Shock Care",
        description:
          "After defibrillation, the rhythm begins to organize. You need to support perfusion and reassess quickly.",
        timeLimit: 20,
        actions: [
          {
            id: "pulse-check",
            label: "Check pulse and rhythm",
            feedback: "Correct. The patient regains a pulse and transitions into a perfusing sinus rhythm.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "leave-pads-off",
            label: "Remove pads immediately",
            feedback: "Incorrect. Pads and monitoring should remain in place during post-arrest reassessment.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Failure to reassess promptly leads to loss of momentum in post-shock care.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
    },
  },
  {
    id: "svt-conscious",
    title: "Supraventricular Tachycardia",
    patient: {
      name: "Chloe Nguyen",
      age: 22,
      condition: "Sudden racing heartbeat during exercise, patient still conscious",
    },
    rhythmId: "supraventricular-tachycardia",
    initialStatus: "unstable",
    initialStepId: "assessment",
    steps: {
      assessment: {
        id: "assessment",
        title: "Initial Assessment",
        description:
          "The patient is alert but anxious with a very rapid regular pulse and mild dizziness. She is perfusing but symptomatic.",
        timeLimit: 24,
        actions: [
          {
            id: "vagal",
            label: "Attempt vagal maneuvers",
            feedback: "Correct. Stable SVT is often managed first with vagal maneuvers.",
            nextStepId: "reassess",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "shock-immediately",
            label: "Immediate defibrillation",
            feedback: "Incorrect. A conscious perfusing SVT patient usually gets less invasive treatment first.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
          {
            id: "walk-it-off",
            label: "Observe without treatment",
            feedback: "Incorrect. Ongoing symptoms and marked tachycardia require intervention.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Continued untreated SVT worsens dizziness and perfusion.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      reassess: {
        id: "reassess",
        title: "Reassess Response",
        description:
          "The rhythm remains fast after vagal maneuvers. The patient is still conscious, but symptoms are continuing.",
        timeLimit: 20,
        actions: [
          {
            id: "adenosine",
            label: "Prepare adenosine",
            feedback: "Correct. Escalating to an appropriate medication is the next step when vagal maneuvers fail.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "give-aspirin",
            label: "Give aspirin",
            feedback: "Incorrect. Aspirin does not address the rhythm causing the patient’s symptoms.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delay allows the patient to become less stable.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
    },
  },
  {
    id: "sinus-tach-stable",
    title: "Sinus Tachycardia",
    patient: {
      name: "Ethan Brooks",
      age: 27,
      condition: "Dehydrated and febrile after several hours of vomiting",
    },
    rhythmId: "sinus-tachycardia",
    initialStatus: "stable",
    initialStepId: "evaluation",
    steps: {
      evaluation: {
        id: "evaluation",
        title: "Evaluate Cause",
        description:
          "The patient has a rapid but regular pulse, is alert, and complains of weakness and thirst. The rhythm appears sinus in origin.",
        timeLimit: 26,
        actions: [
          {
            id: "supportive-care",
            label: "Treat underlying cause",
            feedback: "Correct. Sinus tachycardia is often a response to dehydration, pain, fever, or stress.",
            nextStepId: "support",
            nextStatus: "stable",
            isCorrect: true,
          },
          {
            id: "shock",
            label: "Prepare synchronized shock",
            feedback: "Incorrect. Stable sinus tachycardia is not treated with electrical cardioversion.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
          {
            id: "ignore-rate",
            label: "Ignore the tachycardia",
            feedback: "Incorrect. The patient still needs treatment directed at the cause of the fast rate.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delayed supportive care allows dehydration and tachycardia to continue.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
      support: {
        id: "support",
        title: "Support and Reassess",
        description:
          "You start supportive care and reassess the patient. Symptoms begin to improve, but you still need to confirm the patient is stabilizing.",
        timeLimit: 20,
        actions: [
          {
            id: "monitor-reassess",
            label: "Continue monitoring and reassess",
            feedback: "Correct. The rate trends down and the patient remains stable after treatment.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "give-antiarrhythmic",
            label: "Give antiarrhythmic medication",
            feedback: "Incorrect. Treating the underlying cause is more appropriate than suppressing a sinus response.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Without reassessment, the patient’s response to treatment remains uncertain.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
    },
  },
];
