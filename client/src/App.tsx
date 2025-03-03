import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
