export const AutomatedTestStatusBadge = ({
  status,
}: {
  status: "passed" | "failed";
}) => {
  if (status === "failed") {
    return (
      <div className="flex items-center gap-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="red"
            strokeWidth="2"
            fill="none"
          />

          <line
            x1="8"
            y1="8"
            x2="16"
            y2="16"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="8"
            x2="8"
            y2="16"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <p className="text-red-500">Failed</p>
      </div>
    );
  }
  if (status === "passed") {
    return (
      <div className="flex items-center gap-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="green"
            strokeWidth="5"
            fill="none"
          />

          <path
            d="M30 50 L45 65 L70 35"
            stroke="green"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-green-500">Passed</p>
      </div>
    );
  }
};
