import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import Apply from './pages/Apply';
import Courses from './pages/Courses';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="apply" element={<Apply />} />
        <Route path="courses" element={<Courses />} />
      </Route>
    </Routes>
  );
}

export default App;
