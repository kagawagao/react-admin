import { createRoot } from 'react-dom/client';
import HelloWorld from './components/hello-world';
import './styles/index.less';

console.log(process.env.BIZ_ENV);

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(<HelloWorld />);
