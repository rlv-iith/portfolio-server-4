// Singleton event accumulator — import trackEvent anywhere, useAnalytics flushes it
const _events = [];

export function trackEvent(type, data = {}) {
  _events.push({ type, data, t: Date.now() });
}

export function getEvents() {
  return [..._events];
}
