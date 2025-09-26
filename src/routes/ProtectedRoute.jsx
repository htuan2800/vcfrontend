import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'

const ProtectedRoute = ( {allowedRoles}) => {
  const userState = useSelector((state) => state.user);
  console.log(userState);
  // if (!userState) {
  //   return <Navigate to="/login" replace />;
  // }

  if (!allowedRoles.includes(userState.currentUser?.role || '')) {
    return (
      <div className='flex items-center justify-center text-red-500'>
          Something went wrong
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;