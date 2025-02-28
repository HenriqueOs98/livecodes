import React, { useEffect, useRef, useState } from 'react';
import { EditorInstance, LiveCodesLiteProps } from '../types';
import { createEditor } from '../utils/create-editor';

export const LiveCodesLite: React.FC<LiveCodesLiteProps> = ({
  value = '',
  language = 'javascript',
  theme = 'light',
  config = {},
  onChange,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editor, setEditor] = useState<EditorInstance | null>(null);
  
  // Initialize editor
  useEffect(() => {
    if (!containerRef.current) return;
    
    const editorConfig = {
      ...config,
      language,
      theme,
    };
    
    const editorInstance = createEditor({
      container: containerRef.current,
      value,
      config: editorConfig,
    });
    
    const removeListener = editorInstance.onContentChanged((newValue) => {
      onChange?.(newValue);
    });
    
    setEditor(editorInstance);
    
    return () => {
      removeListener();
      editorInstance.destroy();
    };
  }, []);
  
  // Update editor value when prop changes
  useEffect(() => {
    if (editor && value !== editor.getValue()) {
      editor.setValue(value);
    }
  }, [value, editor]);
  
  // Update language when prop changes
  useEffect(() => {
    if (editor && language !== editor.getLanguage()) {
      editor.setLanguage(language);
    }
  }, [language, editor]);
  
  // Update theme when prop changes
  useEffect(() => {
    if (editor) {
      editor.setTheme(theme);
    }
  }, [theme, editor]);
  
  return (
    <div 
      ref={containerRef} 
      className={`livecodes-lite-editor ${className}`}
      style={{ 
        width: '100%', 
        height: '100%', 
        minHeight: '200px',
        border: '1px solid #ddd',
        overflow: 'hidden'
      }}
    />
  );
};