import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import sonarjs from 'eslint-plugin-sonarjs';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
  // Ignore generated files
  {
    ignores: ['dist/**/*', '.astro/**/*', 'node_modules/**/*', '.github/**/*'],
  },
  // Global config
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // Recommended configs
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  sonarjs.configs.recommended,
  jsxA11y.flatConfigs.recommended,

  // Astro specific overrides
  {
    files: ['*.astro'],
    processor: 'astro/client-side-ts',
    languageOptions: {
      timeout: 50000,
    },
  },

  // Custom rules
  {
    rules: {
      // Add any custom rules here
    },
  },
];
