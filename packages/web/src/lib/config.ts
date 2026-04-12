/**
 * Centralized web configuration.
 * Every tunable UI constant lives here — no magic numbers in components.
 */

export const WEB_CONFIG = {
  // ── Polling intervals ──

  sessionStaleTimeMs: 30_000,
  activeStreamPollingMs: 5_000,
  monitorPollingMs: 60_000,
  updateCheckStaleTimeMs: 5 * 60 * 1000,

  // ── Layout ──

  sidebarWidth: 208,
  panelMinWidth: 260,
  panelMaxWidthRatio: 0.8,

  // ── Dashboard grid ──

  gridRows: 12,
  gridCols: 12,
  gridMinRowHeight: 20,
  gridMargin: [8, 8] as [number, number],

  // ── Chat ──

  chatThrottleMs: 50,

  // ── SSE ──

  maxSseErrors: 3,

  // ── Monitor chart ──

  maxBuckets: 366,
} as const;
