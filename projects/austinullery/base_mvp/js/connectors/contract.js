/**
 * Stub connector contract for future real integrations (Phase 2+).
 * No network calls in Phase 1.
 *
 * @typedef {{ connected: boolean, lastUpdated: string, summary: string }} ModuleStatus
 * @typedef {{ metricName: string, timestamps: string[], values: number[] }} TimeSeriesMetric
 * @typedef {{ timestamp: string, type: string, sourceModule: string, attributes: Record<string, string> }} HomeEvent
 */

/** @returns {Promise<null>} */
export async function createStubConnector() {
  return null;
}
