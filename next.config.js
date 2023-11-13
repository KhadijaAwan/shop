// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     output: 'export',
//     images: {
//       loader: 'default',
//     },
//   }

//   module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

// next.config.js

const commonConfig = {
  images: {
    loader: 'default',
  },
};

const isApiRoute = (phase, { defaultConfig }) => {
  return phase === 'api-handler';
};

const getOutputConfig = (isApi) => {
  return isApi ? {} : { output: 'export' };
};

module.exports = (phase, { defaultConfig }) => {
  const isApi = isApiRoute(phase, { defaultConfig });
  const outputConfig = getOutputConfig(isApi);

  return {
    ...defaultConfig,
    ...commonConfig,
    ...outputConfig,
  };
};

