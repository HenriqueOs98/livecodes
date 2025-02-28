import { EditorState, Extension } from '@codemirror/state';
import { EditorView, ViewUpdate, keymap, lineNumbers as showLineNumbers } from '@codemirror/view';
import { indentUnit } from '@codemirror/language';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { oneDark } from '@codemirror/theme-one-dark';
import { autocompletion } from '@codemirror/autocomplete';
import { languages } from './languages';
import { EditorConfig, EditorInstance } from '../types';

interface CreateEditorOptions {
  container: HTMLElement;
  value?: string;
  config?: EditorConfig;
}

export function createEditor(options: CreateEditorOptions): EditorInstance {
  const { container, value = '', config = {} } = options;
  const {
    language = 'javascript',
    theme = 'light',
    fontSize = 14,
    lineNumbers = true,
    readOnly = false,
    tabSize = 2,
    autoCloseTags = true,
    autoCloseBrackets = true,
  } = config;
  
  let currentLanguage = language;
  const callbacks: Array<(value: string) => void> = [];
  
  // Create custom theme extension
  const customTheme = EditorView.theme({
    '&': {
      fontSize: `${fontSize}px`,
      height: '100%',
    },
    '.cm-content': {
      fontFamily: 'monospace',
    }
  });
  
  // Base extensions
  const extensions: Extension[] = [
    history(),
    keymap.of([...defaultKeymap, ...historyKeymap]),
    indentUnit.of(' '.repeat(tabSize)),
    customTheme,
    autocompletion(),
    EditorView.updateListener.of((update: ViewUpdate) => {
      if (update.docChanged) {
        const value = update.state.doc.toString();
        callbacks.forEach(cb => cb(value));
      }
    }),
    EditorView.contentAttributes.of({
      'aria-label': 'Code editor'
    }),
  ];
  
  // Add language support
  if (languages[currentLanguage]) {
    extensions.push(languages[currentLanguage].languageFactory());
  }
  
  // Add theme
  if (theme === 'dark') {
    extensions.push(oneDark);
  }
  
  // Add line numbers if enabled
  if (lineNumbers) {
    extensions.push(showLineNumbers());
  }
  
  // Add readonly if enabled
  if (readOnly) {
    extensions.push(EditorState.readOnly.of(true));
  }
  
  // Create editor
  const state = EditorState.create({
    doc: value,
    extensions,
  });
  
  const view = new EditorView({
    state,
    parent: container,
  });
  
  return {
    getValue: () => view.state.doc.toString(),
    setValue: (newValue: string) => {
      const currentValue = view.state.doc.toString();
      if (newValue !== currentValue) {
        view.dispatch({
          changes: { from: 0, to: currentValue.length, insert: newValue }
        });
      }
    },
    getLanguage: () => currentLanguage,
    setLanguage: (lang: string) => {
      if (lang !== currentLanguage && languages[lang]) {
        currentLanguage = lang;
        const currentValue = view.state.doc.toString();
        
        // Create new state with updated language
        const newState = EditorState.create({
          doc: currentValue,
          extensions: extensions.filter(ext => {
            // Filter out the current language extension
            return !Object.values(languages).some(
              l => ext === l.languageFactory()
            );
          }).concat(languages[lang].languageFactory()),
        });
        
        view.setState(newState);
      }
    },
    setTheme: (newTheme: 'light' | 'dark') => {
      const currentValue = view.state.doc.toString();
      
      // Create new state with updated theme
      const newState = EditorState.create({
        doc: currentValue,
        extensions: extensions.filter(ext => ext !== oneDark)
          .concat(newTheme === 'dark' ? oneDark : []),
      });
      
      view.setState(newState);
    },
    focus: () => view.focus(),
    format: async () => {
      // Simple formatting for demo purposes
      // In a real implementation, you would use a proper formatter based on the language
      console.log('Format not implemented');
      return Promise.resolve();
    },
    onContentChanged: (callback: (value: string) => void) => {
      callbacks.push(callback);
      return () => {
        const index = callbacks.indexOf(callback);
        if (index > -1) {
          callbacks.splice(index, 1);
        }
      };
    },
    destroy: () => {
      callbacks.length = 0;
      view.destroy();
    },
  };
}