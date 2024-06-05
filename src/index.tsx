import App from '@/app';
import { createRoot } from 'react-dom/client';
import './styles/index.less';

// Render your React component instead
const root = createRoot(document.getElementById('app')!);
root.render(<App />);
