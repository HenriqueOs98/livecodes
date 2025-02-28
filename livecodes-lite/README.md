# LiveCodes Lite

A simplified, lightweight code editor component for React applications, built with CodeMirror and TypeScript.

## Features

- Modern CodeMirror 6 integration
- TypeScript support
- React component for easy embedding
- Multiple language support (JavaScript, TypeScript, JSX, TSX, HTML, CSS)
- Light and dark themes
- Customizable settings

## Installation

```bash
npm install livecodes-lite
# or
yarn add livecodes-lite
```

## Usage

```jsx
import React, { useState } from 'react';
import { LiveCodesLite } from 'livecodes-lite';

function App() {
  const [code, setCode] = useState('console.log("Hello, world!");');
  
  return (
    <div style={{ height: '400px', width: '100%' }}>
      <LiveCodesLite
        value={code}
        language="javascript"
        theme="dark"
        config={{
          fontSize: 14,
          lineNumbers: true,
          tabSize: 2,
        }}
        onChange={(newCode) => setCode(newCode)}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | '' | The initial value for the editor |
| language | string | 'javascript' | The language for syntax highlighting |
| theme | 'light' \| 'dark' | 'light' | The editor theme |
| config | EditorConfig | {} | Additional editor configuration |
| onChange | function | undefined | Callback when content changes |
| className | string | '' | Additional CSS class name |

### Supported Languages

- `javascript` - JavaScript
- `typescript` - TypeScript
- `jsx` - React JSX
- `tsx` - React TSX
- `html` - HTML
- `css` - CSS

### EditorConfig Options

```typescript
interface EditorConfig {
  language?: string;
  theme?: 'light' | 'dark';
  fontSize?: number;
  lineNumbers?: boolean;
  readOnly?: boolean;
  tabSize?: number;
  autoCloseTags?: boolean;
  autoCloseBrackets?: boolean;
}
```

## Example: Custom Usage

```jsx
import React, { useState } from 'react';
import { LiveCodesLite } from 'livecodes-lite';

// Create a custom editor with typescript support
function TypeScriptEditor() {
  const [tsCode, setTsCode] = useState(`
interface User {
  name: string;
  age: number;
}

function greet(user: User) {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = {
  name: "John",
  age: 30
};

console.log(greet(user));
  `);

  return (
    <div className="editor-container">
      <h2>TypeScript Editor</h2>
      <div style={{ height: '400px', border: '1px solid #ccc' }}>
        <LiveCodesLite
          value={tsCode}
          language="typescript"
          theme="dark"
          onChange={setTsCode}
        />
      </div>
    </div>
  );
}

export default TypeScriptEditor;
```

## License

MIT