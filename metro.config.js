const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add .bin to the list of asset extensions
config.resolver.assetExts.push('bin');

// Alias react-native-fs to expo-file-system
config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'react-native-fs': require.resolve('expo-file-system'),
};

module.exports = config;
