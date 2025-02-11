module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        const TerserPlugin = webpackConfig.optimization.minimizer.find(
          (plugin) => plugin.constructor.name === 'TerserPlugin'
        );
  
        if (TerserPlugin) {
          TerserPlugin.options.parallel = false; // Desactiva los workers
        }
  
        return webpackConfig;
      },
    },
  };
  