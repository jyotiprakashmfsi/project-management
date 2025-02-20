import hub from '@mindfiredigital/eslint-plugin-hub';
import globals from 'globals';

export default [
  // Extends the mern config preset from the plugin
  hub.configs['flat/mern'],
  {
    languageOptions: {
      globals: globals.builtin,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];