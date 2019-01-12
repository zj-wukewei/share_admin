const { injectBabelPlugin } = require('react-app-rewired');
const rewireSass = require('react-app-rewire-scss');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  // do stuff with the webpack config...
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }],
    config,
  );
  config = rewireSass(config, env);
  config = rewireLess.withLoaderOptions({
    modifyVars: { "@primary-color": "#001529" },
    javascriptEnabled: true,
  })(config, env);
  return config;
};