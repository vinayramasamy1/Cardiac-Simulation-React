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
    id: "pea",
    title: "Pulseless Electrical Activity",
    patient: {
      name: "Marcus Hill",
      age: 63,
      condition: "Patient is unresponsive and pulseless with electrical activity on the monitor.",
    },
    rhythmId: "pea",
    initialStatus: "critical",
    initialStepId: "arrival",
    steps: {
      arrival: {
        id: "arrival",
        title: "Pulseless Electrical Activity",
        description:
          "Patient is unresponsive and pulseless with electrical activity on the monitor.",
        timeLimit: 22,
        actions: [
          {
            id: "start-cpr",
            label: "Start CPR",
            feedback:
              "Correct. Immediate high-quality CPR is the priority for pulseless electrical activity.",
            nextStepId: "epinephrine",
            nextStatus: "critical",
            isCorrect: true,
          },
          {
            id: "defibrillate",
            label: "Defibrillate",
            feedback:
              "Incorrect. PEA is a non-shockable rhythm, so defibrillation is not indicated.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "wait",
            label: "Wait",
            feedback:
              "Incorrect. Waiting delays resuscitation while the patient remains pulseless.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delayed CPR in PEA rapidly worsens the chance of recovery.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      epinephrine: {
        id: "epinephrine",
        title: "Medication Support",
        description:
          "CPR is underway, but the patient remains pulseless and needs continued ACLS-directed care.",
        timeLimit: 20,
        actions: [
          {
            id: "administer-epinephrine",
            label: "Administer epinephrine",
            feedback:
              "Correct. Epinephrine is appropriate while CPR continues in pulseless electrical activity.",
            nextStepId: "reversible-causes",
            nextStatus: "critical",
            isCorrect: true,
          },
          {
            id: "wait-after-cpr",
            label: "Wait",
            feedback:
              "Incorrect. Passive monitoring is not an appropriate next step in an active arrest.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delay to medication support reduces the effectiveness of resuscitation.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      "reversible-causes": {
        id: "reversible-causes",
        title: "Find the Cause",
        description:
          "The monitor still shows organized electrical activity without perfusion. Continue treatment while assessing why the arrest occurred.",
        timeLimit: 20,
        actions: [
          {
            id: "check-reversible-causes",
            label: "Check reversible causes",
            feedback:
              "Correct. Identifying and treating reversible causes is a key step in PEA management.",
            outcome: "success",
            nextStatus: "unstable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "defibrillate-late",
            label: "Defibrillate",
            feedback:
              "Incorrect. PEA remains non-shockable even later in the arrest sequence.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Without checking reversible causes, the patient continues to deteriorate.",
          outcome: "failure",
          nextStatus: "critical",
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
    id: "symptomatic-bradycardia",
    title: "Symptomatic Bradycardia",
    patient: {
      name: "Helen Morris",
      age: 71,
      condition: "Patient has hypotension, dizziness, and heart rate of 35 bpm.",
    },
    rhythmId: "sinus-bradycardia",
    initialStatus: "unstable",
    initialStepId: "initial-treatment",
    steps: {
      "initial-treatment": {
        id: "initial-treatment",
        title: "Initial Treatment",
        description: "Patient has hypotension, dizziness, and heart rate of 35 bpm.",
        timeLimit: 24,
        actions: [
          {
            id: "give-atropine",
            label: "Give atropine",
            feedback:
              "Correct. Atropine is an appropriate first-line treatment for symptomatic bradycardia.",
            nextStepId: "pacing",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "observe",
            label: "Observe",
            feedback:
              "Incorrect. The patient is symptomatic and poorly perfusing, so observation alone is unsafe.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "discharge",
            label: "Discharge",
            feedback:
              "Incorrect. This patient is unstable and requires urgent treatment, not discharge.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Ongoing severe bradycardia is worsening perfusion.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      pacing: {
        id: "pacing",
        title: "Escalate Support",
        description:
          "The patient remains symptomatic after the initial intervention and still needs better perfusion support.",
        timeLimit: 20,
        actions: [
          {
            id: "start-pacing",
            label: "Start pacing",
            feedback:
              "Correct. Pacing is appropriate when symptomatic bradycardia persists.",
            nextStepId: "supportive-care",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "observe-after-atropine",
            label: "Observe",
            feedback:
              "Incorrect. Continued symptoms require escalation instead of waiting.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delay to pacing allows the patient to become more unstable.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      "supportive-care": {
        id: "supportive-care",
        title: "Stabilize Perfusion",
        description:
          "Electrical support is in progress, and the patient still needs supportive care while you reassess blood pressure and symptoms.",
        timeLimit: 18,
        actions: [
          {
            id: "administer-fluids",
            label: "Administer fluids",
            feedback:
              "Correct. Supportive fluids can help improve blood pressure while ongoing treatment continues.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "discharge-after-pacing",
            label: "Discharge",
            feedback:
              "Incorrect. The patient still requires monitoring and stabilization.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Without continued support, the patient remains at risk for decompensation.",
          outcome: "failure",
          nextStatus: "unstable",
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
  {
    id: "afib-rvr",
    title: "Atrial Fibrillation with RVR",
    patient: {
      name: "Andrea Collins",
      age: 68,
      condition: "Patient has irregular rapid heart rate (~150 bpm) with palpitations.",
    },
    rhythmId: "atrial-fibrillation",
    initialStatus: "urgent",
    initialStepId: "rate-control",
    steps: {
      "rate-control": {
        id: "rate-control",
        title: "Initial Stabilization",
        description: "Patient has irregular rapid heart rate (~150 bpm) with palpitations.",
        timeLimit: 24,
        actions: [
          {
            id: "control-rate",
            label: "Control rate",
            feedback:
              "Correct. Rate control is an appropriate first step for AFib with rapid ventricular response.",
            nextStepId: "cardioversion",
            nextStatus: "urgent",
            isCorrect: true,
          },
          {
            id: "start-cpr",
            label: "Start CPR",
            feedback:
              "Incorrect. The patient is perfusing and symptomatic, so CPR is not indicated.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "do-nothing",
            label: "Do nothing",
            feedback:
              "Incorrect. Delaying treatment can worsen symptoms and hemodynamic instability.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Uncontrolled AFib with RVR is worsening the patient's condition.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      cardioversion: {
        id: "cardioversion",
        title: "Consider Escalation",
        description:
          "The rhythm remains fast and irregular. You need to decide whether additional stabilization is needed.",
        timeLimit: 20,
        actions: [
          {
            id: "consider-cardioversion",
            label: "Consider cardioversion",
            feedback:
              "Correct. Cardioversion should be considered when symptoms persist or instability increases.",
            nextStepId: "monitoring",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "start-cpr-late",
            label: "Start CPR",
            feedback:
              "Incorrect. The patient still has circulation and needs rhythm-focused treatment instead.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Failure to escalate care allows the patient to become less stable.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      monitoring: {
        id: "monitoring",
        title: "Reassess Response",
        description:
          "The ventricular response is improving, but the patient still needs close reassessment to confirm stabilization.",
        timeLimit: 18,
        actions: [
          {
            id: "monitor-vitals",
            label: "Monitor vitals",
            feedback:
              "Correct. Continued monitoring confirms the patient is stabilizing after treatment.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "do-nothing-late",
            label: "Do nothing",
            feedback:
              "Incorrect. Ongoing reassessment is still necessary even after initial improvement.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Without continued monitoring, recurrent instability can be missed.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
    },
  },
  {
    id: "aflutter-unstable",
    title: "Unstable Atrial Flutter",
    patient: {
      name: "Rosa Delgado",
      age: 74,
      condition: "Rapid regular heart rate (~150 bpm) with hypotension and dizziness.",
    },
    rhythmId: "atrial-flutter",
    initialStatus: "unstable",
    initialStepId: "assessment",
    steps: {
      assessment: {
        id: "assessment",
        title: "Initial Assessment",
        description:
          "The patient is pale and lightheaded with a regular rapid pulse and a low blood pressure. She is still conscious but showing signs of poor perfusion.",
        timeLimit: 22,
        actions: [
          {
            id: "prepare-cardioversion",
            label: "Prepare for synchronized cardioversion",
            feedback:
              "Correct. Tachycardia with hypotension and poor perfusion is unstable and requires immediate synchronized cardioversion.",
            nextStepId: "cardioversion",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "give-adenosine",
            label: "Give adenosine",
            feedback:
              "Incorrect. Adenosine is for stable narrow-complex SVT, not a hemodynamically unstable tachyarrhythmia.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "wait-and-reassess",
            label: "Wait and reassess in 10 minutes",
            feedback: "Incorrect. Unstable tachycardia needs immediate treatment, not a delayed reassessment.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delayed treatment of unstable atrial flutter allows shock to worsen.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      cardioversion: {
        id: "cardioversion",
        title: "Deliver Synchronized Cardioversion",
        description:
          "Sedation is on board and pads are placed. The defibrillator needs to be set correctly before delivering a shock.",
        timeLimit: 18,
        actions: [
          {
            id: "deliver-sync-shock",
            label: "Deliver synchronized cardioversion",
            feedback:
              "Correct. Synchronizing the shock to the R wave avoids inducing a more dangerous rhythm in a perfusing patient.",
            nextStepId: "post-cardioversion",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "deliver-unsync-shock",
            label: "Deliver unsynchronized defibrillation",
            feedback:
              "Incorrect. An unsynchronized shock can land on the T wave and precipitate ventricular fibrillation in a patient who still has a pulse.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "give-metoprolol",
            label: "Give IV metoprolol",
            feedback: "Incorrect. An IV beta-blocker can drop blood pressure further in an already hypotensive patient.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delay to cardioversion allows perfusion to keep worsening.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      "post-cardioversion": {
        id: "post-cardioversion",
        title: "Post-Cardioversion Care",
        description:
          "The rhythm organizes after the shock. You need to confirm the patient is stabilizing and keep monitoring in place.",
        timeLimit: 16,
        actions: [
          {
            id: "reassess-vitals",
            label: "Reassess vitals and rhythm",
            feedback: "Correct. Blood pressure improves and the patient converts to a stable, perfusing rhythm.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "remove-monitoring",
            label: "Remove pads and monitoring",
            feedback: "Incorrect. Continuous monitoring is needed immediately after cardioversion to catch recurrence.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Without reassessment, a recurrence after cardioversion can be missed.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
    },
  },
  {
    id: "vtach-pulse",
    title: "Ventricular Tachycardia with a Pulse",
    patient: {
      name: "Daniel Osei",
      age: 61,
      condition: "History of prior heart attack, now with palpitations and a regular wide-complex tachycardia.",
    },
    rhythmId: "ventricular-tachycardia",
    initialStatus: "stable",
    initialStepId: "assessment",
    steps: {
      assessment: {
        id: "assessment",
        title: "Initial Assessment",
        description:
          "The monitor shows a regular wide-complex tachycardia around 180 bpm. The patient is alert and talking with an adequate blood pressure.",
        timeLimit: 24,
        actions: [
          {
            id: "give-amiodarone",
            label: "Prepare an antiarrhythmic (amiodarone)",
            feedback: "Correct. Stable monomorphic VT is treated first with an antiarrhythmic such as amiodarone or procainamide.",
            nextStepId: "reassess",
            nextStatus: "stable",
            isCorrect: true,
          },
          {
            id: "immediate-cardioversion",
            label: "Immediate synchronized cardioversion",
            feedback: "Incorrect. The patient is currently stable, so medication is tried before electrical therapy.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
          {
            id: "discharge-vtach",
            label: "Reassure patient and discharge",
            feedback: "Incorrect. Sustained VT always needs treatment and continuous monitoring, even if the patient feels stable right now.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Untreated sustained VT can deteriorate without warning.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
      reassess: {
        id: "reassess",
        title: "Reassess Response",
        description:
          "The antiarrhythmic is infusing, but the rhythm is still VT and the patient now feels lightheaded with a dropping blood pressure.",
        timeLimit: 20,
        actions: [
          {
            id: "prepare-cardioversion-vtach",
            label: "Prepare for synchronized cardioversion",
            feedback: "Correct. If VT persists and the patient becomes unstable, synchronized cardioversion is the next step.",
            nextStepId: "cardioversion",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "repeat-amiodarone",
            label: "Give a second dose of amiodarone",
            feedback: "Incorrect. Repeating the same antiarrhythmic risks toxicity; clinical deterioration calls for electrical therapy instead.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delay while the patient is deteriorating raises the risk of losing a pulse entirely.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      cardioversion: {
        id: "cardioversion",
        title: "Deliver Synchronized Cardioversion",
        description: "The patient remains hypotensive and lightheaded. Pads are placed and sedation is on board.",
        timeLimit: 16,
        actions: [
          {
            id: "deliver-sync-shock-vtach",
            label: "Deliver synchronized cardioversion",
            feedback: "Correct. Synchronized cardioversion terminates the VT and restores a stable, perfusing rhythm.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "deliver-unsync-shock-vtach",
            label: "Deliver unsynchronized defibrillation",
            feedback: "Incorrect. The patient still has a pulse, so the shock must be synchronized to avoid inducing ventricular fibrillation.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Continued delay risks the patient losing a pulse.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
    },
  },
  {
    id: "wpw-preexcited-afib",
    title: "WPW with Pre-Excited Atrial Fibrillation",
    patient: {
      name: "Priya Anand",
      age: 29,
      condition: "Known WPW, now with sudden palpitations and an irregular, very rapid wide-complex rhythm.",
    },
    rhythmId: "wpw",
    initialStatus: "unstable",
    initialStepId: "assessment",
    steps: {
      assessment: {
        id: "assessment",
        title: "Initial Assessment",
        description:
          "The monitor shows an irregular, wide-complex tachycardia at a very fast rate — concerning for pre-excited atrial fibrillation from the patient's known accessory pathway.",
        timeLimit: 22,
        actions: [
          {
            id: "give-procainamide",
            label: "Prepare procainamide",
            feedback: "Correct. Procainamide is preferred for pre-excited atrial fibrillation because it slows conduction through the accessory pathway.",
            nextStepId: "reassess",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "give-adenosine-wpw",
            label: "Give adenosine",
            feedback: "Incorrect. Adenosine blocks the AV node and can push conduction down the accessory pathway, risking ventricular fibrillation in pre-excited AFib.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
          {
            id: "give-diltiazem-wpw",
            label: "Give diltiazem",
            feedback: "Incorrect. AV nodal blocking agents like diltiazem are contraindicated in pre-excited atrial fibrillation and can accelerate the ventricular rate.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Delayed treatment of pre-excited AFib risks degeneration into a more dangerous rhythm.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      reassess: {
        id: "reassess",
        title: "Reassess Response",
        description:
          "Procainamide is infusing. The rhythm is beginning to organize, but the patient remains tachycardic and slightly lightheaded.",
        timeLimit: 18,
        actions: [
          {
            id: "monitor-wpw",
            label: "Continue monitoring and reassess vitals",
            feedback: "Correct. Continued monitoring is appropriate while the antiarrhythmic takes effect.",
            nextStepId: "stabilization",
            nextStatus: "unstable",
            isCorrect: true,
          },
          {
            id: "second-av-blocker",
            label: "Give a second AV nodal blocking agent",
            feedback: "Incorrect. Any AV nodal blocking agent remains dangerous in pre-excited AFib, even after a dose of procainamide.",
            outcome: "failure",
            nextStatus: "critical",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Without reassessment, a dangerous rhythm change could be missed.",
          outcome: "failure",
          nextStatus: "critical",
        },
      },
      stabilization: {
        id: "stabilization",
        title: "Confirm Stabilization",
        description: "The ventricular rate is slowing and the patient feels less lightheaded. One more assessment will confirm improvement.",
        timeLimit: 16,
        actions: [
          {
            id: "reassess-wpw-final",
            label: "Reassess rhythm and vital signs",
            feedback: "Correct. The patient converts to a stable, organized rhythm after appropriate treatment.",
            outcome: "success",
            nextStatus: "stable",
            nextRhythmId: "normal-sinus",
            isCorrect: true,
          },
          {
            id: "discharge-wpw",
            label: "Discharge without further monitoring",
            feedback: "Incorrect. Patients with pre-excited AFib need continued cardiac monitoring after conversion.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Stopping monitoring too early can miss a recurrence.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
    },
  },
  {
    id: "ear-monitor",
    title: "Ectopic Atrial Rhythm",
    patient: {
      name: "Miguel Torres",
      age: 34,
      condition: "Reports occasional palpitations, found to have an atrial rhythm with abnormal P-wave morphology.",
    },
    rhythmId: "ectopic-atrial-rhythm",
    initialStatus: "stable",
    initialStepId: "evaluation",
    steps: {
      evaluation: {
        id: "evaluation",
        title: "Initial Evaluation",
        description:
          "The monitor shows a regular atrial rhythm with abnormal P-wave morphology at a near-normal rate. The patient is alert with normal vital signs and only mild, intermittent palpitations.",
        timeLimit: 24,
        actions: [
          {
            id: "monitor-and-identify-cause",
            label: "Monitor rhythm and identify possible causes",
            feedback: "Correct. Ectopic atrial rhythm at a controlled rate is usually benign and managed by monitoring and identifying underlying triggers.",
            nextStepId: "support",
            nextStatus: "stable",
            isCorrect: true,
          },
          {
            id: "immediate-cardioversion-ear",
            label: "Prepare for immediate cardioversion",
            feedback: "Incorrect. A stable, well-perfused patient with a benign-appearing atrial rhythm does not need electrical therapy.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
          {
            id: "give-epinephrine-ear",
            label: "Give epinephrine",
            feedback: "Incorrect. Epinephrine would increase heart rate and is not indicated for this stable, benign rhythm.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Failing to reassess could allow an unrecognized change in rhythm or symptoms to go unnoticed.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
      support: {
        id: "support",
        title: "Supportive Monitoring",
        description: "No reversible cause is found, and the patient remains asymptomatic with stable vital signs.",
        timeLimit: 18,
        actions: [
          {
            id: "continue-monitoring-ear",
            label: "Continue supportive monitoring",
            feedback: "Correct. The patient remains stable, and the rhythm continues to be well tolerated.",
            outcome: "success",
            nextStatus: "stable",
            isCorrect: true,
          },
          {
            id: "start-antiarrhythmic-ear",
            label: "Start an antiarrhythmic medication",
            feedback: "Incorrect. A stable, asymptomatic ectopic atrial rhythm does not require antiarrhythmic treatment.",
            outcome: "failure",
            nextStatus: "unstable",
            isCorrect: false,
          },
        ],
        timeout: {
          feedback: "Time expired. Without a final reassessment, a subtle change in the patient's condition could be missed.",
          outcome: "failure",
          nextStatus: "unstable",
        },
      },
    },
  },
];
