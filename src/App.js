import { Routes, Route } from 'react-router-dom';
import './app.css';
import Home from './pages/Home/Home';
import TikTok from './pages/TikTok/TikTok';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import Admin from './pages/Admin/Admin';
import ContextPopupProvider from './context/popup/popup_context_provider';
import PopupContainer from './context/popup/popup_container';
import { ContextProvider } from './context/user/userContext';

function App() {
  return (
    <ContextProvider>
      <ContextPopupProvider>
        <PopupContainer />
        <Routes>
          <Route index element={<Home />} />
          <Route path='/TikTok' element={<TikTok />} />
          <Route path='/wp-admin' element={<AdminLogin />} />
          <Route path='/wp-admin/admin' element={<Admin />} />
        </Routes>
      </ContextPopupProvider>
    </ContextProvider>
  );
}

export default App;
