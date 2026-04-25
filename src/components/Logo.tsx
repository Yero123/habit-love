interface LogoProps {
  size?: number;
  showText?: boolean;
}

export function Logo({ size = 40, showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
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
          <filter id="heart-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          d="M24 38 C24 38 10 28 10 18 C10 12 15 8 20 8 C22.5 8 24 11 24 14 C24 11 25.5 8 28 8 C33 8 38 12 38 18 C38 28 24 38 24 38Z"
          fill="url(#heart-grad)"
          filter="url(#heart-glow)"
        />
        <circle cx="17" cy="16" r="2.5" fill="rgba(255,255,255,0.25)" />
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