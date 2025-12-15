import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Courses from './pages/Courses';
import News from './pages/News';
import { LoadingProvider } from './contexts/LoadingContext';

function App() {
  return (
    <LoadingProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="apply" element={<Apply />} />
          <Route path="courses" element={<Courses />} />
          <Route path="news" element={<News />} />
        </Route>
      </Routes>
    </LoadingProvider>
  );
}

export default App;
