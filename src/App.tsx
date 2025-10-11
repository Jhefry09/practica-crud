import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EmployeeProvider } from './Contexts/EmployeeContext';
import Dashboard from './pages/Dashboard/Page';
import Employees from './pages/Dashboard/Employees';
import Graphics from './pages/Dashboard/Graphics';
import Reports from './pages/Dashboard/Reports';
import Settings from './pages/Dashboard/Settings';
import Login from './pages/Login/Page';
import Register from './pages/Register/Page';

function App() {
  return (
    <Router>
      <EmployeeProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/graphics" element={<Graphics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </EmployeeProvider>
    </Router>
  );
}

export default App;