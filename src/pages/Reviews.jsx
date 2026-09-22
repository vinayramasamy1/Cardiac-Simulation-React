import { Link, useParams } from "react-router-dom";
import { REVIEW_CATEGORIES, REVIEW_QUESTIONS } from "../data/reviewQuestions.js";
import ReviewQuiz from "../components/ReviewQuiz.jsx";
import "../styles/reviews.css";

function ReviewsHome() {
  return (
    <section className="page">
      <div className="home-center reviews-home">
        <h1 className="home-title">Reviews</h1>
        <p className="home-subtitle">
          Choose a category to begin a quick review.
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

          <Link
            className="home-tile"
            to="/real-time-mode"
            role="listitem"
            aria-label="Open Real Time Mode"
          >
            <div className="home-tile__box review-tile__box">
              <img
                className="home-tile__icon home-tile__icon--large"
                src="/assets/icon-real-time-mode.svg"
                alt=""
              />
            </div>

            <div className="home-tile__label">Real Time Mode</div>
            <div className="review-tile__desc">
              Open a starter simulation layout for future live cardiac scenarios.
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Reviews() {
  const { category: categoryId } = useParams();
  if (!categoryId) return <ReviewsHome />;

  const category = REVIEW_CATEGORIES.find((item) => item.id === categoryId);
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

  return <ReviewQuiz key={categoryId} category={category} questions={REVIEW_QUESTIONS[categoryId] || []} />;
}
