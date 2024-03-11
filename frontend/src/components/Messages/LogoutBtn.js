import React from 'react';
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = () => {
  const { logout, loading } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      {loading ? (
        <span className="loading loading-spinner"></span>
      ) : (
        <button className="btn btn-primary w-full mt-6" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default LogoutBtn;
