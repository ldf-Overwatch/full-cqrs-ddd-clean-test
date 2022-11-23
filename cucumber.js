let common = [
  'features/*.feature', // Specify our feature files
  '--require-module ts-node/register',
  '--require features/step-definitions/*.ts', // Load step definitions
  '--format progress-bar', // Load custom formatter
].join(' ');

module.exports = {
  default: common,
};
