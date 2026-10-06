# Tasks and Success Criteria

## How tasks are written (and why)

- **Goal-based, not instruction-based.** "Find what AFib looks like" instead of "Click Rhythms, then AFib." If you name the button, you're testing reading comprehension, not whether the navigation works.
- **Realistic scenarios.** A reason to act makes people behave naturally.
- **Success defined in advance.** Deciding afterward leads to wishful scoring.
- Time limit per task: **3 minutes** (5 for Task 6). After that, stop and mark as Failed.

### Outcome codes (use in the results tracker)

| Code | Meaning |
| --- | --- |
| S | Success, no help and no real difficulty |
| D | Success, but with difficulty (wrong turns, long hesitation, 2+ attempts) |
| A | Assisted: you had to nudge them |
| F | Failed or gave up |

---

## Task 1: Find a rhythm (Goal 1: Findability)

**Scenario:** "You're studying for an exam and want to learn what Atrial Fibrillation looks like. Show me how you'd find that."

- **Success:** Reaches a page that shows AFib (rhythm card, simulator, or waveform).
- **Why this task:** It's the most basic job of the site. If it fails, nothing else matters.
- **Watch for:** Do they use top nav, home tiles, or the sidebar? Do they understand "AFib" is Atrial Fibrillation?

## Task 2: Control the animation (Goal 2: Controls)

**Scenario:** "That animation is going too fast to study. Make it slower."

- **Success:** Changes playback speed to 0.75x, 0.5x, or 0.25x on the rhythm simulator.
- **Why:** Speed controls are central to learning rhythms, and the labels (1x, 0.5x) may not be self-explanatory.
- **Watch for:** Do they find the speed control? Do they know which direction is "slower"? (Does a smaller number mean slower?)

## Task 3: Use the EKG Waveforms page (Goal 2: Controls)

**Scenario:** "Now you want to compare how Ventricular Fibrillation looks compared to a normal heartbeat on a live EKG strip. See if you can do that."

- **Success:** Opens EKG Waveforms and views both VFib and Normal Sinus Rhythm waveforms.
- **Why:** The page has a rhythm selector, play/pause/reset, a speed control, and collapsible panels. This tests whether the layout is clear.
- **Watch for:** Do they notice the panels can collapse? Do they understand the difference between this page and the Rhythms page?

## Task 4: Read a case study (Goal 4: Learning value)

**Scenario:** "You want to see how a real patient with an unstable fast heart rhythm would be treated. Find a patient case and tell me what the recommended treatment is."

- **Success:** Opens Case Studies, selects a relevant case (for example VTach or SVT), switches to the Treatment view, and states the treatment.
- **Why:** The case flow has several steps (list, scenario view, treatment view). Hover vs click behavior might confuse people.
- **Watch for:** Do they find the Treatment view? Do they notice the case list collapse? How do they react to a missing treatment image (EAR has none)?

## Task 5: Take a quiz (Goal 4: Learning value)

**Scenario:** "Test your knowledge of heart medications."

- **Success:** Opens Reviews, selects Medication, answers at least 3 questions, and reads the feedback.
- **Why:** Tests category navigation and whether the immediate feedback and explanations are understood.
- **Watch for:** Do they notice the explanations? Can they reset or switch categories? Do correct/incorrect colors make sense (including colorblind users)?

## Task 6: Try a timed emergency scenario (Goal 3: Real Time Mode)

**Scenario:** "Your instructor said there's a mode where you practice making decisions on a patient in an emergency, against a clock. Find it and start one."

- **Success:** Reaches Real Time Mode and starts a scenario.
- **Why:** **This is the highest-risk task.** Real Time Mode is only linked from inside the Reviews page, not the top nav or home page. Many participants may never find it.
- **Watch for:** Where do they look first? How long before they find it, if at all? Do they give up?

**Do not say "Real Time Mode" in the prompt if participants find it too easily.** The wording above intentionally describes it without naming it.

## Task 7: Play through the scenario (Goal 3: Real Time Mode)

*(Only if Task 6 succeeded. If they failed, guide them there, mark Task 6 as F or A, then continue.)*

**Scenario:** "Go through this scenario as if you were the responder. Talk me through your choices."

- **Success:** Makes at least 2 decisions and reaches an outcome or the end summary.
- **Why:** Tests whether the timer, action choices, and patient status updates are understandable under pressure.
- **Watch for:** Do they understand the countdown? Do they know what the waveform changing means? Do they understand the outcome summary and why they succeeded or failed?

## Task 8: Navigate back (Goal 1: Findability)

**Scenario:** "You're done. Return to the starting page of the site."

- **Success:** Gets back to the home page.
- **Why:** Cheap check that orientation is clear. The logo and Home link should both work.

---

## Task order rationale

Tasks go from simple to complex and end with Real Time Mode, so earlier tasks don't teach participants where Real Time Mode is. Don't reorder Task 6 earlier, because exploring Reviews first in Task 5 gives away its location. That is a known tradeoff: if you want a purer discoverability test, run Task 6 *first* with half the participants and compare.
