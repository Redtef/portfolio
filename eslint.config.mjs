// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import nextPlugin from '@next/eslint-plugin-next';

/**
 * Full ESLint Flat Config for Next.js 14 + TypeScript
 * Hamza's Portfolio Project
 */

export default defineConfig([
  // -----------------------------------------------------
  // 🧩 1. Ignored files and directories
  // -----------------------------------------------------
  globalIgnores([
    'node_modules',
    '.next/**',
    'dist/**',
    'build/**',
    'coverage/**',
    'out/**',
    '.webpack/**',
  ]),

  // -----------------------------------------------------
  // 🧩 2. Main lint configuration
  // -----------------------------------------------------
  {
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // project: ['./tsconfig.json'],
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      '@typescript-eslint': typescriptEslint,
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
    },

    // -----------------------------------------------------
    // 🧩 3. Extend base configurations
    // -----------------------------------------------------
    rules: {
      // --- Include Next.js recommended + Core Web Vitals ---
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,

      // --- TypeScript + React tweaks (from your previous setup) ---
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@next/next/no-img-element': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'import/no-anonymous-default-export': 'off',
      '@next/next/no-html-link-for-pages': 'off',

      // --- Accessibility (jsx-a11y) ---
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
    },

    // -----------------------------------------------------
    // 🧩 4. Environment / Globals
    // -----------------------------------------------------
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
]);
