import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// user
import { useDispatch } from 'react-redux';
import { handleUserDecoded } from '../utils/jwtHelper.js';
import { updateUser } from '../redux/features/userSlice.ts';
import App from '@/App.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import UserLayout from '@/components/layouts/userLayout.jsx';



const AppRoutes = () => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    // Kiểm tra nếu đang ở trang admin
    const { decoded } = handleUserDecoded()
    if (decoded?.id) {
      handleGetUserDetails(decoded?.id)
    }
    setIsLoading(false)
  }, [])


  const handleGetUserDetails = async (id) => {
    const res = await UserService.getDetailsUser(id)
    // Lấy lại token mới nhất sau interceptor
    const updatedToken = localStorage.getItem('access_token');
    await dispatch(updateUser({ ...res?.data, access_token: JSON.parse(updatedToken) }))
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'USER', '']} />}>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<App />} />
            {/* <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> */}
          </Route>
        </Route>

        {/* <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedRouteAdmin allowedRoles={['ADMIN']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};


export default AppRoutes;