export default function QuizCard({ question, number, answer, flipped, busy, readOnly, onSelect, onRetry, headingRef }) {
  const correct = answer?.selected === question.correctAnswer;
  return (
    <div className="review-card">
      <div className={`review-card__inner${flipped ? " is-flipped" : ""}`}>
        <article className="review-card__face" aria-hidden={flipped} inert={flipped || busy}>
          <p className="review-quiz__eyebrow">Question {number}</p>
          <h2 ref={!flipped ? headingRef : undefined} tabIndex={-1}>{question.question}</h2>
          <div className="review-card__choices">
            {question.choices.map((choice, index) => {
              const text = typeof choice === "string" ? choice : choice.text;
              return (
                <button key={text} type="button" className={`review-card__choice${answer?.selected === text ? ` is-selected ${correct ? "is-correct" : "is-incorrect"}` : ""}`}
                  aria-pressed={answer?.selected === text} disabled={busy || readOnly} onClick={() => onSelect(choice)}>
                  <span className="review-card__letter" aria-hidden="true">{answer?.selected === text ? (correct ? "✓" : "×") : String.fromCharCode(65 + index)}</span>
                  <span>{text}</span>
                </button>
              );
            })}
          </div>
        </article>
        <article className={`review-card__face review-card__back ${answer ? (correct ? "is-correct" : "is-incorrect") : ""}`}
          aria-hidden={!flipped} inert={!flipped || busy}>
          <p className="review-quiz__eyebrow">Question {number} · Feedback</p>
          <h2 className="review-card__status" ref={flipped ? headingRef : undefined} tabIndex={-1}>
            <span className="review-card__status-icon" aria-hidden="true">{answer ? (correct ? "✓" : "×") : "—"}</span>
            {answer ? (correct ? "Correct!" : "Incorrect") : "Unanswered"}
          </h2>
          <p className="review-card__prompt">{question.question}</p>
          <dl className="review-card__answers">
            <div className="review-card__selected-answer"><dt>Your answer</dt><dd>{answer?.selected || "Unanswered"}</dd></div>
            <div className="review-card__correct-answer"><dt>Correct answer</dt><dd>{question.correctAnswer}</dd></div>
          </dl>
          <p className="review-card__explanation"><strong>Explanation</strong>{answer?.feedback || question.feedbackByChoice?.[question.correctAnswer]}</p>
          {!readOnly && <button className="review-quiz__button review-card__retry" type="button" disabled={busy} onClick={onRetry}>{correct ? "Change Answer" : "Try Again"}</button>}
        </article>
      </div>
    </div>
  );
}
