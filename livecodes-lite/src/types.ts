export interface EditorConfig {
  language?: string;
  theme?: 'light' | 'dark';
  fontSize?: number;
  lineNumbers?: boolean;
  readOnly?: boolean;
  tabSize?: number;
  autoCloseTags?: boolean;
  autoCloseBrackets?: boolean;
}

export interface LanguageDefinition {
  name: string;
  extensions: string[];
  languageFactory: () => any;
}

export interface EditorInstance {
  getValue: () => string;
  setValue: (value: string) => void;
  getLanguage: () => string;
  setLanguage: (language: string) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  focus: () => void;
  format: () => Promise<void>;
  destroy: () => void;
  onContentChanged: (callback: (value: string) => void) => () => void;
}

export interface LiveCodesLiteProps {
  value?: string;
  language?: string;
  theme?: 'light' | 'dark';
  config?: EditorConfig;
  onChange?: (code: string) => void;
  className?: string;
}