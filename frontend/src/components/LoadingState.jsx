import "./LoadingState.scss";

const SkeletonLine = ({ className = "" }) => (
  <div className={`skeleton-line ${className}`.trim()} />
);

const LoadingState = ({
  title = "Loading",
  description = "Please wait while we finish the request.",
  variant = "report",
}) => {
  const progressSteps = [
    "Analyzing resume",
    "Matching role requirements",
    "Preparing interview guidance",
  ];

  return (
    <div className="loading-state">
      <div className="loading-state__header">
        <div className="loading-spinner-wrap" aria-label="Generating report">
          <span className="loading-spinner" aria-hidden="true" />
          <span className="loading-spinner__core" aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Processing</p>
          <h2>{title}</h2>
        </div>
      </div>

      <p className="loading-state__description">{description}</p>

      <div className="loading-progress" aria-live="polite">
        {progressSteps.map((step, index) => (
          <div key={step} className="loading-progress__item">
            <span className="loading-progress__dot" aria-hidden="true" />
            <span>{step}</span>
            {index < progressSteps.length - 1 && (
              <span className="loading-progress__line" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>

      {variant === "report" ? (
        <div className="loading-skeleton loading-skeleton--report">
          <div className="loading-skeleton__header">
            <SkeletonLine className="w-40" />
            <SkeletonLine className="w-24" />
          </div>

          <div className="loading-skeleton__grid">
            <div className="loading-skeleton__card">
              <SkeletonLine className="w-100" />
              <SkeletonLine className="w-80" />
              <SkeletonLine className="w-90" />
            </div>
            <div className="loading-skeleton__card">
              <SkeletonLine className="w-100" />
              <SkeletonLine className="w-80" />
              <SkeletonLine className="w-90" />
            </div>
            <div className="loading-skeleton__card wide">
              <SkeletonLine className="w-100" />
              <SkeletonLine className="w-80" />
              <SkeletonLine className="w-90" />
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-skeleton loading-skeleton--list">
          <div className="loading-skeleton__row">
            <SkeletonLine className="w-60" />
            <SkeletonLine className="w-28" />
          </div>
          <div className="loading-skeleton__row">
            <SkeletonLine className="w-50" />
            <SkeletonLine className="w-32" />
          </div>
          <div className="loading-skeleton__row">
            <SkeletonLine className="w-70" />
            <SkeletonLine className="w-22" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LoadingState;
