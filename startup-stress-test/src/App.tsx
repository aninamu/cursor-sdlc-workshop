import { useMemo, useState } from 'react';

type ScoreKey = 'tam' | 'competition' | 'feasibility' | 'risk' | 'team';

const DIMENSIONS: { key: ScoreKey; label: string }[] = [
  { key: 'tam', label: 'Market (TAM)' },
  { key: 'competition', label: 'Competition' },
  { key: 'feasibility', label: 'Feasibility' },
  { key: 'risk', label: 'Risk profile' },
  { key: 'team', label: 'Team' },
];

function letterGrade(score: number): string {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

function RadarChart({
  scores,
  size,
}: {
  scores: Record<ScoreKey, number>;
  size: number;
}) {
  const keys = DIMENSIONS.map((d) => d.key);
  const n = keys.length;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.38;
  const points = keys.map((key, i) => {
    const angle = (-Math.PI / 2 + (i * 2 * Math.PI) / n) as number;
    const r = (scores[key] / 100) * maxR;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {[0.25, 0.5, 0.75, 1].map((t) => (
        <circle
          key={t}
          cx={cx}
          cy={cy}
          r={maxR * t}
          fill="none"
          stroke="var(--border)"
          strokeWidth="1"
        />
      ))}
      {keys.map((_, i) => {
        const angle = (-Math.PI / 2 + (i * 2 * Math.PI) / n) as number;
        const x2 = cx + maxR * Math.cos(angle);
        const y2 = cy + maxR * Math.sin(angle);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={x2}
            y2={y2}
            stroke="var(--border)"
            strokeWidth="1"
          />
        );
      })}
      <path d={pathD} fill="rgba(99, 102, 241, 0.25)" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  );
}

export default function App() {
  const [scores, setScores] = useState<Record<ScoreKey, number>>({
    tam: 70,
    competition: 65,
    feasibility: 75,
    risk: 60,
    team: 72,
  });

  const average = useMemo(() => {
    const vals = Object.values(scores);
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
  }, [scores]);

  return (
    <div className="app">
      <header className="header">
        <h1>Startup stress test</h1>
        <p className="lede">
          Slide each dimension from 0–100. Grades and the radar chart update live.
        </p>
      </header>

      <div className="layout">
        <section className="panel">
          <h2>Inputs</h2>
          <ul className="sliders">
            {DIMENSIONS.map(({ key, label }) => (
              <li key={key}>
                <label htmlFor={key}>{label}</label>
                <div className="slider-row">
                  <input
                    id={key}
                    type="range"
                    min={0}
                    max={100}
                    value={scores[key]}
                    onChange={(e) =>
                      setScores((s) => ({ ...s, [key]: Number(e.target.value) }))
                    }
                  />
                  <span className="value">{scores[key]}</span>
                  <span className="grade">{letterGrade(scores[key])}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="panel">
          <h2>Scorecard</h2>
          <p className="overall">
            Overall: <strong>{average}</strong> ({letterGrade(average)})
          </p>
          <div className="chart-wrap">
            <RadarChart scores={scores} size={320} />
          </div>
          <div className="report">
            <h3>Report</h3>
            <p>
              {average >= 75
                ? 'Strong positioning across dimensions—pressure-test assumptions before scaling.'
                : average >= 60
                  ? 'Mixed signals: tighten the weakest dimension first, then revisit the rest.'
                  : 'Several gaps to close before this reads as fundable; prioritize feasibility and risk.'}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
