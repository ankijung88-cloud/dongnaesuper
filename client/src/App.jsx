import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductManage from './pages/ProductManage';
import Cart from './pages/Cart';
import SuperAdmin from './pages/SuperAdmin';
import Navbar from './components/Navbar';
import { LanguageProvider } from './context/LanguageContext';

import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Routes */}
              <Route path="/cart" element={
                <ProtectedRoute allowedRoles={['user', 'owner', 'admin']}>
                  <Cart />
                </ProtectedRoute>
              } />
              <Route path="/admin/products" element={
                <ProtectedRoute allowedRoles={['owner', 'admin']}>
                  <ProductManage />
                </ProtectedRoute>
              } />
              <Route path="/super-admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <SuperAdmin />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
