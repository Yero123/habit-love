interface LogoProps {
  size?: number;
  showText?: boolean;
}

export function Logo({ size = 32, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <filter id="heart-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M24 36 C24 36 11 29 11 19 C11 14 15 11 19 11 C21.5 11 23 13 24 15 C25 13 26.5 11 29 11 C33 11 37 14 37 19 C37 29 24 36 24 36Z"
          fill="url(#heart-grad)"
          filter="url(#heart-glow)"
        />
        <circle cx="18" cy="17" r="2" fill="rgba(255,255,255,0.2)" />
      </svg>
      {showText && (
        <h1
          className="text-[22px] font-extrabold tracking-tight"
          style={{
            background: "linear-gradient(95deg, #c4b5fd 0%, #f9a8d4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.5px",
          }}
        >
          Habit<span style={{ fontWeight: 500, opacity: 0.6 }}> </span>Love
        </h1>
      )}
    </div>
  );
}