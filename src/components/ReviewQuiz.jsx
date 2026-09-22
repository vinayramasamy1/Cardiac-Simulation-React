import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import QuizCard from "./QuizCard.jsx";

const motionQuery = "(prefers-reduced-motion: reduce)";

export default function ReviewQuiz({ category, questions }) {
  const [answers, setAnswers] = useState(() => questions.map(() => null));
  const [flags, setFlags] = useState(() => questions.map(() => false));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [direction, setDirection] = useState("next");
  const [mode, setMode] = useState("quiz");
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const headingRef = useRef(null);
  const confirmRef = useRef(null);
  const finishRef = useRef(null);
  const timerRef = useRef(null);
  const locked = useRef(false);
  const targetRef = useRef(0);
  const pendingFocus = useRef(false);
  const reduced = useRef(window.matchMedia(motionQuery).matches);
  const busy = phase !== "idle";
  const total = questions.length;
  const answered = answers.filter(Boolean).length;
  const correct = answers.filter((answer, i) => answer?.selected === questions[i].correctAnswer).length;
  const unanswered = total - answered;
  const flagged = flags.filter(Boolean).length;

  useEffect(() => {
    const query = window.matchMedia(motionQuery);
    const update = () => { reduced.current = query.matches; };
    query.addEventListener("change", update);
    return () => {
      query.removeEventListener("change", update);
      clearTimeout(timerRef.current);
    };
  }, []);

  // Timers are the single animation clock: no dependence on CSS end events,
  // which may be cancelled or absent when reduced motion is enabled.
  function schedule(callback, duration) {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(callback, reduced.current ? 0 : duration);
  }

  function settle() {
    locked.current = false;
    pendingFocus.current = true;
    setPhase("idle");
  }

  useEffect(() => {
    if (confirmFinish) confirmRef.current?.focus();
    else if (phase === "idle" && pendingFocus.current) {
      pendingFocus.current = false;
      headingRef.current?.focus();
    }
  }, [phase, index, flipped, mode, confirmFinish]);

  function select(choice) {
    if (locked.current || mode !== "quiz" || confirmFinish) return;
    locked.current = true;
    const selected = typeof choice === "string" ? choice : choice.text;
    const question = questions[index];
    const feedback = (typeof choice === "object" && choice.feedback) || question.feedbackByChoice?.[selected] ||
      (selected === question.correctAnswer ? "Correct. This is the best answer." : `The correct answer is ${question.correctAnswer}.`);
    setAnswers((previous) => previous.map((answer, i) => i === index ? { selected, feedback } : answer));
    setPhase("selected");
    schedule(() => {
      setFlipped(true);
      setPhase("flipping");
      schedule(() => {
        setAnnouncement(`${selected === question.correctAnswer ? "Correct!" : "Incorrect."} ${feedback}`);
        settle();
      }, 500);
    }, 180);
  }

  function retry() {
    if (locked.current || mode !== "quiz") return;
    locked.current = true;
    setAnnouncement("");
    setFlipped(false);
    setPhase("flipping");
    schedule(settle, 500);
  }

  function goTo(nextIndex) {
    if (locked.current || confirmFinish || nextIndex === index || nextIndex < 0 || nextIndex >= total) return;
    locked.current = true;
    targetRef.current = nextIndex;
    setDirection(nextIndex > index ? "next" : "previous");
    setAnnouncement("");
    setPhase("exiting");
    schedule(() => {
      const next = targetRef.current;
      setIndex(next);
      setFlipped(mode === "review" || Boolean(answers[next]));
      setPhase("entering");
      schedule(settle, 160);
    }, 160);
  }

  function reset() {
    clearTimeout(timerRef.current);
    locked.current = false;
    pendingFocus.current = true;
    setAnswers(questions.map(() => null));
    setFlags(questions.map(() => false));
    setIndex(0);
    setFlipped(false);
    setPhase("idle");
    setMode("quiz");
    setConfirmFinish(false);
    setAnnouncement("Quiz reset. All answers and flags cleared.");
    // Also focus when reset changes no dependencies of the focus effect.
    schedule(() => headingRef.current?.focus(), 0);
  }

  function showResults() {
    if (locked.current) return;
    pendingFocus.current = true;
    setConfirmFinish(false);
    setAnnouncement(`Quiz complete. ${correct} of ${total} correct; ${unanswered} unanswered.`);
    setMode("results");
  }

  function reviewAnswers() {
    pendingFocus.current = true;
    setIndex(0);
    setFlipped(true);
    setMode("review");
    setAnnouncement("Reviewing completed answers. Start a new attempt with Try Again.");
  }

  const navigation = (
    <div className="review-quiz__navigation">
      <button type="button" className="review-quiz__button" disabled={busy || index === 0} onClick={() => goTo(index - 1)}><span aria-hidden="true">←</span>Previous</button>
      {index < total - 1 && <button type="button" className="review-quiz__button review-quiz__button--primary" disabled={busy} onClick={() => goTo(index + 1)}>Next Question<span aria-hidden="true">→</span></button>}
    </div>
  );

  return (
    <section className="page review-quiz">
      <header className="review-quiz__header">
        <div><p className="review-quiz__eyebrow">Knowledge review</p><h1 className="hero__title">{category.title}</h1></div>
        <div className="review-quiz__actions">
          <Link className="review-quiz__button" to="/reviews">Back to Reviews</Link>
          <button type="button" className="review-quiz__button" onClick={reset}>Reset Quiz</button>
        </div>
      </header>
      <p className="review-quiz__sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      {!total ? <p>No questions are available for this category.</p> : mode === "results" ? (
        <div className="review-quiz__results">
          <p className="review-quiz__eyebrow">Review complete</p>
          <h2 ref={headingRef} tabIndex={-1}>Your results</h2>
          <div className="review-quiz__result-summary">
            <p className="review-quiz__score">{Math.round(correct / total * 100)}<span>%</span></p>
            <div><p className="review-quiz__result-total">{correct} out of {total} correct</p>
              <p className="review-quiz__result-caption">Based on your final answers</p></div>
          </div>
          <dl className="review-quiz__stats">
            <div><dt>Correct</dt><dd>{correct}</dd></div>
            <div><dt>Incorrect</dt><dd>{answered - correct}</dd></div>
            <div><dt>Unanswered</dt><dd>{unanswered}</dd></div>
            <div><dt>Flagged</dt><dd>{flagged}</dd></div>
          </dl>
          <div className="review-quiz__actions">
            <button className="review-quiz__button review-quiz__button--primary" onClick={reviewAnswers}>Review Answers</button>
            <button className="review-quiz__button" onClick={reset}>Try Again</button>
            <Link className="review-quiz__button" to="/reviews">Back to Reviews</Link>
          </div>
          <h3>Missed &amp; unanswered questions</h3>
          {correct === total ? <p>You answered every question correctly.</p> : questions.map((question, i) => answers[i]?.selected === question.correctAnswer ? null : (
            <article key={i} className="review-quiz__missed">
              <h4>{i + 1}. {question.question}</h4>
              <p><strong>Your answer:</strong> {answers[i]?.selected || "Unanswered"}</p>
              <p><strong>Correct answer:</strong> {question.correctAnswer}</p>
              <p>{answers[i]?.feedback || question.feedbackByChoice?.[question.correctAnswer]}</p>
            </article>
          ))}
        </div>
      ) : (
        <>
          <div className="review-quiz__workspace" inert={confirmFinish} aria-hidden={confirmFinish}>
            {mode === "review" && <p className="review-quiz__notice"><strong>Reviewing Answers</strong><span>Read-only · Your final answers are preserved.</span></p>}
            <div className="review-quiz__progress-label"><strong>Question {index + 1} of {total}</strong><span>{answered} answered · {flagged} flagged</span></div>
            <progress className="review-quiz__sr-only" value={index + 1} max={total} aria-label="Current question progress" />
            <div className="review-quiz__progress" aria-hidden="true">
              <span style={{ transform: `scaleX(${(index + 1) / total})` }} />
            </div>
            <div className="review-quiz__flag-row">
              <button type="button" className="review-quiz__button" aria-pressed={flags[index]} disabled={busy || mode === "review"}
                onClick={() => setFlags((previous) => previous.map((flag, i) => i === index ? !flag : flag))}>
                <span aria-hidden="true">⚑</span> {flags[index] ? "Flagged" : "Flag question"}
              </button>
            </div>
            <div className={`review-quiz__deck review-quiz__deck--${direction} review-quiz__deck--${phase}`}>
              <QuizCard key={index} question={questions[index]} number={index + 1} answer={answers[index]} flipped={flipped}
                busy={busy} readOnly={mode === "review"} onSelect={select} onRetry={retry} headingRef={headingRef} />
            </div>
            {navigation}
            <nav className="review-quiz__numbers" aria-label="Question navigator">
              {questions.map((_, i) => (
                <button type="button" key={i} disabled={busy} aria-current={i === index ? "step" : undefined}
                  aria-label={`Question ${i + 1}, ${answers[i] ? "answered" : "unanswered"}${flags[i] ? ", flagged" : ""}`}
                  className={`review-quiz__number${answers[i] ? " is-answered" : ""}${flags[i] ? " is-flagged" : ""}`}
                  onClick={() => goTo(i)}>{i + 1}{flags[i] && <span aria-hidden="true"> ⚑</span>}</button>
              ))}
            </nav>
            <div className="review-quiz__legend">Filled: answered · Outline: current · ⚑: flagged</div>
            <div className="review-quiz__footer">
              {mode === "review" ? <>
                <button className="review-quiz__button" onClick={reset}>Try Again</button>
                <button className="review-quiz__button review-quiz__button--primary" disabled={busy} onClick={showResults}>Back to Results</button>
              </> : <button ref={finishRef} className="review-quiz__button" disabled={busy} onClick={() => unanswered ? setConfirmFinish(true) : showResults()}>Finish Quiz</button>}
            </div>
          </div>
          {confirmFinish && <section className="review-quiz__confirmation" role="region" aria-labelledby="finish-title">
            <h2 id="finish-title" ref={confirmRef} tabIndex={-1}>Finish with unanswered questions?</h2>
            <p>{unanswered} of {total} questions remain unanswered. They will count as unanswered in your results.</p>
            <div className="review-quiz__actions">
              <button className="review-quiz__button" onClick={() => { setConfirmFinish(false); schedule(() => finishRef.current?.focus(), 0); }}>Return to Quiz</button>
              <button className="review-quiz__button review-quiz__button--primary" onClick={showResults}>Finish Anyway</button>
            </div>
          </section>}
        </>
      )}
    </section>
  );
}
