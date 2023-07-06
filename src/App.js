import { Routes, Route } from 'react-router-dom';
import './app.css';
import Home from './pages/Home/Home';
import TikTok from './pages/TikTok/TikTok';
import Admin from './pages/Admin/Admin';
import ContextPopupProvider from './context/popup/popup_context_provider';
import PopupContainer from './context/popup/popup_container';

function App() {
  return (
    <ContextPopupProvider>
      <PopupContainer />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/TikTok' element={<TikTok />} />
        <Route path='/wp-admin' element={<Admin />} />
      </Routes>
    </ContextPopupProvider>
  );
}

export default App;
