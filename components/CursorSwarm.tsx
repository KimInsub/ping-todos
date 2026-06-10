"use client";

const CURSORS = [
  { name: "Sarah D.", color: "#E879F9", delay: 300 },
  { name: "Mike T.", color: "#60A5FA", delay: 900 },
  { name: "Jess L.", color: "#34D399", delay: 1500 },
  { name: "Ryan K.", color: "#FBBF24", delay: 2100 },
  { name: "Ana M.", color: "#F87171", delay: 2700 },
];

function CursorIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <path
        d="M1 1L6 18L8.5 10.5L15 8.5L1 1Z"
        fill={color}
        stroke="rgba(0,0,0,0.4)"
        strokeWidth="1"
      />
    </svg>
  );
}

interface CursorSwarmProps {
  visible: boolean;
  departing?: boolean;
}

export function CursorSwarm({ visible, departing }: CursorSwarmProps) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
      {CURSORS.map((cursor, i) => {
        const departDelay = i * 400;
        const style: React.CSSProperties = departing
          ? {
              animation: `cursor-enter 400ms ease-out ${cursor.delay}ms both, cursor-path-${i} 6s ease-in-out ${cursor.delay + 400}ms infinite alternate, cursor-depart 900ms ease-in ${departDelay}ms forwards`,
            }
          : {
              animation: `cursor-enter 400ms ease-out ${cursor.delay}ms both, cursor-path-${i} 6s ease-in-out ${cursor.delay + 400}ms infinite alternate`,
            };

        return (
          <div
            key={cursor.name}
            className="absolute"
            style={style}
          >
            <CursorIcon color={cursor.color} />
            <span
              className="absolute left-4 top-3 text-[10px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap"
              style={{ backgroundColor: cursor.color, color: "#000" }}
            >
              {cursor.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
