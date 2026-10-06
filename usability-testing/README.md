# Usability Testing Kit: Cardiac Simulator

This folder is a complete, ready-to-run usability study for the Cardiac Simulator Learning Tool.

## What usability testing is (and why)

You watch real people try to do real things on the site while you stay quiet. You are **not** testing the participants. You are testing the website. Every place a person hesitates, misclicks, or says "huh?" is a design problem you can fix.

Developers cannot do this alone, because we know where everything is. Participants don't.

## The files, in the order you use them

| Step | File | What it is | Why it exists |
| --- | --- | --- | --- |
| 1 | This README | Goals, recruiting, logistics | Decide what you want to learn *before* testing, or you collect random opinions |
| 2 | `01-test-script.md` | Word-for-word script for the facilitator | Every participant gets the same experience, so results are comparable |
| 3 | `02-tasks-and-success-criteria.md` | The tasks participants perform, with pass/fail rules | Defines "success" in advance so you don't judge it afterward |
| 4 | `03-sus-survey.md` | 10-question standard satisfaction survey | Gives a single score you can compare before/after fixes |
| 5 | `04-observer-notes-template.md` | Sheet to fill in per participant | Captures behavior as it happens, not from memory |
| 6 | `05-results-tracker.csv` | Spreadsheet of results | Lets you count how many people hit each problem |

## Step 1: Study goals

We want to answer these questions. Every task in the kit maps to one of them.

1. **Findability:** Can a new learner find and open each learning area without help?
2. **Controls:** Do the animation and waveform controls (speed, play/pause, collapsible panels) make sense?
3. **Real Time Mode:** Can people find it, and do they understand what to do and what the feedback means?
4. **Learning value:** Does quiz and case-study feedback help people feel they learned something?

*Why goals first:* Without them you can't decide which findings matter. A complaint about a color is noise unless it affects a goal.

## Step 2: Recruit 5-8 participants

- Aim for **5 minimum**. Research (Nielsen) shows 5 users uncover roughly 85% of major usability problems, and more people mostly repeat the same findings.
- Mix the groups:
  - 3-4 EMT / paramedic / fire students (your real audience)
  - 1-2 instructors or experienced responders
  - 1 complete novice (shows whether the site is understandable without prior knowledge)
- Include at least **one person on a phone or tablet**, since the site has responsive layouts.
- Screening questions to ask each person beforehand:
  - What's your experience with EKG rhythms? (none / student / certified)
  - What device will you use?
  - Have you used this site before? (If yes, they're not a first-time user. Note it or exclude them.)

*Why these people:* Testing with friends who don't resemble your users hides the problems real learners would hit.

## Step 3: Logistics

- **Length:** 30 minutes per person.
- **Setup:** Use a deployed link, or run `npm run dev` and share your screen over Zoom or in person.
- **Record** screen and audio only with written consent (see the consent text in the script). Recordings let you re-watch moments you missed.
- **Roles:** One **facilitator** talks to the participant. One **note-taker** (if you have one) fills in the observer sheet. Doing both alone is possible but harder. Record so you can catch up.
- **Pilot first:** Run the whole script once on a friend. This reveals broken tasks or wording *before* real participants see them.

## Step 4: After the sessions

1. Fill in `05-results-tracker.csv` for every participant.
2. Calculate: task success rate, average time per task, and SUS score.
3. List every problem found, count how many participants hit it, and rate severity:
   - **Blocker:** participant could not complete the task
   - **Major:** completed with significant difficulty
   - **Minor:** small annoyance
4. Fix problems in order: most participants affected x highest severity.
5. Re-test with 3-5 new people and compare SUS scores to see if the changes helped.

## Hypotheses to check

Reading the code before writing this kit suggested some likely problem spots. They are guesses to verify, not conclusions.

- **Real Time Mode is hard to find.** It isn't in the top nav or on the home page. It's only a tile inside the Reviews page (`src/pages/Reviews.jsx`). Task 6 tests this.
- The branding says "Scottsdale Fire Dept." Do participants understand what the tool is for?
- Collapsible panels on the EKG Waveforms and Case Studies pages might not be noticed. Task 3 and Task 4 observe this.
