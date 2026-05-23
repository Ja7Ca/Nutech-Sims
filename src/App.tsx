import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';
import { Analytics } from "@vercel/analytics/react"
import './App.css';

function App() {
  return (
    <Router>
      <Analytics />
      <AppRoutes />
    </Router>
  );
}

export default App;

