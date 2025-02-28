import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { LanguageDefinition } from '../types';

export const languages: Record<string, LanguageDefinition> = {
  javascript: {
    name: 'JavaScript',
    extensions: ['.js'],
    languageFactory: () => javascript({ jsx: false, typescript: false }),
  },
  typescript: {
    name: 'TypeScript',
    extensions: ['.ts'],
    languageFactory: () => javascript({ jsx: false, typescript: true }),
  },
  jsx: {
    name: 'JSX',
    extensions: ['.jsx'],
    languageFactory: () => javascript({ jsx: true, typescript: false }),
  },
  tsx: {
    name: 'TSX',
    extensions: ['.tsx'],
    languageFactory: () => javascript({ jsx: true, typescript: true }),
  },
  html: {
    name: 'HTML',
    extensions: ['.html', '.htm'],
    languageFactory: () => html(),
  },
  css: {
    name: 'CSS',
    extensions: ['.css'],
    languageFactory: () => css(),
  },
};