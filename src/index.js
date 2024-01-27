import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import './index.css';
import './App.css'; 
import App from './App';
import Auth from './Auth';
import Stats from './pages/Stats'
import FetchDataFromStrava from './components/FetchDataFromStrava';
import Error from './pages/Error';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<App />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/fetch" element={<FetchDataFromStrava />} />
      <Route path="/error" element={<Error />} /> 
    </Routes>
  </Router>,
  document.getElementById('root')
);