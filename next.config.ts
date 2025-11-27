import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {},

  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.externals.push('@opentelemetry/instrumentation');
  //   }
  //   return config;
  // },
};

export default withSentryConfig(nextConfig, {
  org: 'incode-group-yp',
  project: 'issue-tracker',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
