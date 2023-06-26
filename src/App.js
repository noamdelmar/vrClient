import { Routes, Route } from 'react-router-dom';
import './app.css';
import Home from './pages/Home/Home';
import TikTok from './pages/TikTok/TikTok';

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path='/TikTok' element={<TikTok />} />
    </Routes>
  );
}

export default App;
