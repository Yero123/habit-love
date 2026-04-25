import { PEOPLE } from "../constants/people";

interface AvatarProps {
  personId: "yero" | "jacky";
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: 28,
  md: 36,
  lg: 52,
};

export function Avatar({ personId, size = "md" }: AvatarProps) {
  const person = PEOPLE.find((p) => p.id === personId);
  const px = SIZES[size];

  return (
    <div
      className="rounded-full flex items-center justify-center border-2 overflow-hidden"
      style={{
        width: px,
        height: px,
        borderColor: "rgba(255,255,255,0.18)",
        background:
          personId === "yero"
            ? "linear-gradient(135deg, #a78bfa 0%, #7c3aed 60%, #4c1d95 100%)"
            : "linear-gradient(135deg, #f9a8d4 0%, #db2777 60%, #831843 100%)",
        boxShadow:
          personId === "yero"
            ? "0 0 12px -2px rgba(124,58,237,0.55), inset 0 0 6px rgba(167,139,250,0.35)"
            : "0 0 12px -2px rgba(219,39,119,0.55), inset 0 0 6px rgba(244,114,182,0.35)",
      }}
    >
      <img
        src={`/avatars/${personId}.jpg`}
        alt={person?.name ?? personId}
        width={px}
        height={px}
        className="object-cover"
        style={{ display: "block" }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </div>
  );
}