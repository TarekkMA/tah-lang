// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/#configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: '/src',
  },
  plugins: ['@snowpack/plugin-typescript'],
  // installOptions: {},
  // devOptions: {},
  // buildOptions: {},
  exclude: ['bin/**/*'],
};
