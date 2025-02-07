const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // Tambahkan transformer untuk react-native-svg
  config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

  return config;
})();
  