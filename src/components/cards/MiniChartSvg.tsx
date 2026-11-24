import { useId } from 'react';
import type { CardMiniChart } from '../../types/curriculum';

interface MiniChartSvgProps {
  chart: CardMiniChart;
}

function formatAxisNumber(val: number): string {
  if (val === 0) return '0';
  if (Math.abs(val) >= 1_000_000) {
    const m = val / 1_000_000;
    return `${Number.isInteger(m) ? m : m.toFixed(1)}M`;
  }
  if (Math.abs(val) >= 10_000) {
    const k = val / 1_000;
    return `${Number.isInteger(k) ? k : k.toFixed(0)}k`;
  }
  if (Number.isInteger(val)) return String(val);
  return val.toFixed(1).replace(/\.0$/, '');
}

function computeNiceScale(rawMax: number, tickCount = 4): { maxY: number; ticks: number[] } {
  const safeMax = rawMax > 0 ? rawMax : 10;
  const roughStep = safeMax / tickCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const fraction = roughStep / magnitude;

  let niceFraction: number;
  if (fraction <= 1) niceFraction = 1;
  else if (fraction <= 2) niceFraction = 2;
  else if (fraction <= 2.5) niceFraction = 2.5;
  else if (fraction <= 5) niceFraction = 5;
  else niceFraction = 10;

  const step = niceFraction * magnitude;
  const maxY = Math.ceil(safeMax / step) * step;
  const ticks: number[] = [];
  for (let v = 0; v <= maxY + step * 0.001; v += step) {
    ticks.push(Math.round(v * 1000) / 1000);
  }
  return { maxY: ticks[ticks.length - 1] || maxY, ticks };
}

export function MiniChartSvg({ chart }: MiniChartSvgProps) {
  const gradientId = useId().replace(/:/g, '');

  const hasMultiSeries = Boolean(chart.multiSeries && chart.multiSeries.length > 0);
  const seriesList = hasMultiSeries
    ? chart.multiSeries!
    : [
        {
          name: chart.title,
          color: '#2563eb',
          points: chart.points
        }
      ];

  const labels = seriesList[0]?.points.map((p) => p.label) ?? [];
  const allValues = seriesList.flatMap((s) => s.points.map((p) => p.value));
  const rawMax = allValues.length > 0 ? Math.max(...allValues) : 10;
  const { maxY, ticks } = computeNiceScale(rawMax * 1.08, 4);

  const width = 560;
  const height = 246;
  const padLeft = 56;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const toY = (value: number) => {
    const ratio = maxY > 0 ? value / maxY : 0;
    return padTop + plotH - ratio * plotH;
  };

  const getLineX = (index: number, count: number) => {
    if (count <= 1) return padLeft + plotW / 2;
    const innerPad = Math.min(28, plotW * 0.08);
    const usableW = plotW - innerPad * 2;
    return padLeft + innerPad + (index / (count - 1)) * usableW;
  };

  const getBarMetrics = (index: number, count: number) => {
    const slotW = count > 0 ? plotW / count : plotW;
    const barW = Math.min(34, Math.max(14, slotW * 0.58));
    const cx = padLeft + slotW * index + slotW / 2;
    return { x: cx - barW / 2, cx, barW };
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-2xs space-y-2.5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900">{chart.title}</h4>
          <p className="text-[11px] font-mono text-slate-500">Đơn vị: {chart.unitLabel}</p>
        </div>

        {hasMultiSeries && (
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {seriesList.map((s) => (
              <span key={s.name} className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span>{s.name}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={`${chart.title} (${chart.unitLabel})`}
        className="w-full h-auto block select-none overflow-visible"
      >
        <defs>
          <linearGradient id={`area-${gradientId}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.01" />
          </linearGradient>
        </defs>

        {/* Horizontal gridlines & Y ticks */}
        {ticks.map((tickVal) => {
          const y = toY(tickVal);
          return (
            <g key={tickVal}>
              <line
                x1={padLeft}
                y1={y}
                x2={width - padRight}
                y2={y}
                stroke={tickVal === 0 ? '#cbd5e1' : '#e2e8f0'}
                strokeDasharray={tickVal === 0 ? undefined : '4 4'}
                strokeWidth={tickVal === 0 ? 1.2 : 1}
              />
              <text
                x={padLeft - 8}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-500 text-[11px] font-mono"
              >
                {formatAxisNumber(tickVal)}
              </text>
            </g>
          );
        })}

        {/* Y axis line */}
        <line
          x1={padLeft}
          y1={padTop}
          x2={padLeft}
          y2={padTop + plotH}
          stroke="#cbd5e1"
          strokeWidth={1.2}
        />

        {/* BAR CHART */}
        {chart.chartType === 'bar' && (
          <g>
            {seriesList[0]?.points.map((pt, idx) => {
              const { x, cx, barW } = getBarMetrics(idx, labels.length);
              const y = toY(pt.value);
              const barH = Math.max(2, padTop + plotH - y);
              return (
                <g key={pt.label}>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={barH}
                    rx={4}
                    fill="#2563eb"
                    className="transition-opacity hover:opacity-85"
                  />
                  <text
                    x={cx}
                    y={y - 6}
                    textAnchor="middle"
                    className="fill-slate-700 text-[10px] font-mono font-semibold"
                  >
                    {formatAxisNumber(pt.value)}
                  </text>
                  <text
                    x={cx}
                    y={height - 14}
                    textAnchor="middle"
                    className="fill-slate-600 text-[11px] font-medium"
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </g>
        )}

        {/* LINE CHART */}
        {chart.chartType === 'line' && (
          <g>
            {/* X-axis labels */}
            {labels.map((label, idx) => (
              <text
                key={label}
                x={getLineX(idx, labels.length)}
                y={height - 14}
                textAnchor="middle"
                className="fill-slate-600 text-[11px] font-medium"
              >
                {label}
              </text>
            ))}

            {/* Subtle area fill for single series */}
            {!hasMultiSeries && seriesList[0] && seriesList[0].points.length > 1 && (
              <path
                d={(() => {
                  const pts = seriesList[0].points;
                  const firstX = getLineX(0, pts.length);
                  const lastX = getLineX(pts.length - 1, pts.length);
                  const baseY = padTop + plotH;
                  const lineCmds = pts
                    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getLineX(i, pts.length)} ${toY(p.value)}`)
                    .join(' ');
                  return `${lineCmds} L ${lastX} ${baseY} L ${firstX} ${baseY} Z`;
                })()}
                fill={`url(#area-${gradientId})`}
              />
            )}

            {/* Series lines & data points */}
            {seriesList.map((series, sIdx) => {
              const pts = series.points;
              const polyPoints = pts
                .map((p, i) => `${getLineX(i, pts.length)},${toY(p.value)}`)
                .join(' ');

              return (
                <g key={series.name}>
                  <polyline
                    fill="none"
                    stroke={series.color}
                    strokeWidth={2.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={polyPoints}
                  />

                  {pts.map((p, i) => {
                    const cx = getLineX(i, pts.length);
                    const cy = toY(p.value);

                    // Offset label cleanly above/below in multi-series so labels don't collide
                    let labelY = cy - 9;
                    if (hasMultiSeries && seriesList.length === 2) {
                      const otherVal = seriesList[1 - sIdx]?.points[i]?.value;
                      if (otherVal !== undefined && p.value < otherVal) {
                        labelY = cy + 16;
                      }
                    }

                    return (
                      <g key={`${series.name}-${p.label}`}>
                        <circle
                          cx={cx}
                          cy={cy}
                          r={4.2}
                          fill="#ffffff"
                          stroke={series.color}
                          strokeWidth={2.4}
                        />
                        <text
                          x={cx}
                          y={Math.min(padTop + plotH - 4, Math.max(12, labelY))}
                          textAnchor="middle"
                          fill={series.color}
                          className="text-[10px] font-mono font-bold"
                        >
                          {formatAxisNumber(p.value)}
                        </text>
                      </g>
                    );
                  })}
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
