import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate , Outlet } from 'react-router-dom';
import { PHManagerState } from './store';

interface Props {
  loggedIn: boolean
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({
  loggedIn,
  children
}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { replace: true });
    }
  }, [loggedIn, navigate]);

  return children ? children : <Outlet />;
};

export default connect((state: PHManagerState) => ({
    loggedIn: state.session.loggedIn,
}))(PrivateRoute)
