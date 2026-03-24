import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { REVIEW_CATEGORIES, REVIEW_QUESTIONS } from "../data/reviewQuestions.js";

function QuizBubble({
  number,
  question,
  choices,
  selected,
  status,
  onSelect,
}) {
  return (
    <article className={`quiz-bubble quiz-bubble--${status}`} aria-live="polite">
      <div className="quiz-bubble__top">
        <div className="quiz-bubble__number">Question {number}</div>
        <div className="quiz-bubble__status">
          {status === "correct" && "Correct"}
          {status === "wrong" && "Try again"}
        </div>
      </div>

      <h3 className="quiz-bubble__question">{question}</h3>

      <div className="quiz-bubble__choices">
        {choices.map((choice) => {
          const isSelected = selected === choice;

          return (
            <button
              key={choice}
              type="button"
              className={`quiz-choice ${isSelected ? "quiz-choice--selected" : ""}`}
              onClick={() => onSelect(choice)}
            >
              {choice}
            </button>
          );
        })}
      </div>
    </article>
  );
}

function ReviewsHome() {
  return (
    <section className="page">
      <div className="home-center reviews-home">
        <h1 className="home-title">Reviews</h1>
        <p className="home-subtitle">
          Choose a category to begin a 10-question quick review.
        </p>

        <div className="home-tiles" role="list" aria-label="Review categories">
          {REVIEW_CATEGORIES.map((category) => (
            <Link
              key={category.id}
              className="home-tile"
              to={`/reviews/${category.id}`}
              role="listitem"
              aria-label={`Open ${category.title} review`}
            >
              <div className="home-tile__box review-tile__box">
                <img
                  className="home-tile__icon home-tile__icon--large"
                  src={category.icon}
                  alt=""
                />
              </div>

              <div className="home-tile__label">{category.title}</div>
              <div className="review-tile__desc">{category.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewQuiz({ categoryId }) {
  const navigate = useNavigate();

  const category = useMemo(
    () => REVIEW_CATEGORIES.find((item) => item.id === categoryId),
    [categoryId]
  );

  const questions = REVIEW_QUESTIONS[categoryId] || [];

  const createInitialAnswers = () =>
    questions.map(() => ({
      selected: "",
      status: "idle",
    }));

  const [answers, setAnswers] = useState(createInitialAnswers);

  useEffect(() => {
    setAnswers(createInitialAnswers());
  }, [categoryId]);

  function handleSelect(index, choice) {
    setAnswers((prev) => {
      const updated = [...prev];
      const isCorrect = choice === questions[index].correctAnswer;

      updated[index] = {
        selected: choice,
        status: isCorrect ? "correct" : "wrong",
      };

      return updated;
    });
  }

  function handleReset() {
    setAnswers(createInitialAnswers());
  }

  if (!category) {
    return (
      <section className="page">
        <div className="hero">
          <h1 className="hero__title">Review Not Found</h1>
          <p className="hero__sub">That review category does not exist.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="page reviews-page">
      <div className="reviews-head">
        <div>
          <h1 className="hero__title reviews-title">{category.title}</h1>
          <p className="hero__sub">
            Answer all 10 questions. Correct answers turn green. Incorrect answers turn red.
          </p>
        </div>

        <div className="reviews-actions">
          <button
            type="button"
            className="sidebar__btn reviews-back-btn"
            onClick={() => navigate("/reviews")}
          >
            Back to Reviews
          </button>

          <button
            type="button"
            className="sidebar__btn reviews-back-btn"
            onClick={handleReset}
          >
            Reset Quiz
          </button>
        </div>
      </div>

      <div className="quiz-grid">
        {questions.map((item, index) => (
          <QuizBubble
            key={`${categoryId}-${index}`}
            number={index + 1}
            question={item.question}
            choices={item.choices}
            selected={answers[index]?.selected || ""}
            status={answers[index]?.status || "idle"}
            onSelect={(choice) => handleSelect(index, choice)}
          />
        ))}
      </div>
    </section>
  );
}

export default function Reviews() {
  const { category } = useParams();

  if (!category) {
    return <ReviewsHome />;
  }

  return <ReviewQuiz categoryId={category} />;
}