/**
 * Environment-based logging configuration.
 * Suppresses debug/dev logs in production environments to reduce noise and prevent sensitive data leakage.
 */
export const setupLogger = () => {
  if (process.env.NODE_ENV === 'production') {
    // No-op function
    const noop = () => {};

    // Suppress dev logs
    console.log = noop;
    console.debug = noop;
    console.info = noop;

    // We retain console.warn and console.error for production error tracking
    // Consider hooking these up to an external service (e.g., Sentry, Datadog) in the future.
  } else {
    console.log('[Logger] Development mode active. Detailed logs enabled.');
  }
};
