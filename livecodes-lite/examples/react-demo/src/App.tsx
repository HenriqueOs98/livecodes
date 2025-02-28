import React, { useState } from 'react';
import { LiveCodesLite } from 'livecodes-lite';

const jsxCode = `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
`;

const typescriptCode = `
interface User {
  name: string;
  age: number;
}

function greet(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = {
  name: "John",
  age: 30
};

console.log(greet(user));
`;

const htmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is a paragraph.</p>
</body>
</html>
`;

const cssCode = `
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
  color: #333;
}

h1 {
  color: #0066cc;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

p {
  line-height: 1.6;
}
`;

function App() {
  const [language, setLanguage] = useState<string>('javascript');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [code, setCode] = useState<string>('console.log("Hello, world!");');
  
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = event.target.value;
    setLanguage(lang);
    
    // Set example code based on language
    if (lang === 'javascript') {
      setCode('console.log("Hello, world!");');
    } else if (lang === 'typescript') {
      setCode(typescriptCode);
    } else if (lang === 'jsx') {
      setCode(jsxCode);
    } else if (lang === 'html') {
      setCode(htmlCode);
    } else if (lang === 'css') {
      setCode(cssCode);
    }
  };
  
  return (
    <div className="app">
      <header>
        <h1>LiveCodes Lite Demo</h1>
        <div className="controls">
          <div>
            <label htmlFor="language">Language:</label>
            <select 
              id="language" 
              value={language} 
              onChange={handleLanguageChange}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="jsx">JSX</option>
              <option value="tsx">TSX</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
            </select>
          </div>
          <div>
            <label htmlFor="theme">Theme:</label>
            <select 
              id="theme" 
              value={theme} 
              onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </header>
      
      <div className="editor-container">
        <LiveCodesLite
          value={code}
          language={language}
          theme={theme}
          config={{
            fontSize: 16,
            lineNumbers: true,
            tabSize: 2,
          }}
          onChange={(newCode) => setCode(newCode)}
        />
      </div>
      
      <footer>
        <p>Built with CodeMirror, React, and TypeScript</p>
      </footer>
    </div>
  );
}

export default App;