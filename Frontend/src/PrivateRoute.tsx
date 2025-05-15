import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate , Outlet } from 'react-router-dom';
import { PHManagerState } from './store';
import readySelector from './store/selectors/readySelector';

interface Props {
  loggedIn: boolean
  children?: React.ReactNode;
  roleUser: string;
  requiredRoles?: string[]
}

const hasRequiredRoles = (
  userRoles: string[] = [],
  requiredRoles: string[] = []
): boolean => {
  return requiredRoles.every(role => userRoles.includes(role));
};

const PrivateRoute: React.FC<Props> = ({
  loggedIn,
  children,
  roleUser,
  requiredRoles
}) => {

  const navigate = useNavigate();
  const isReady = useSelector(readySelector); 

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { replace: true });
    }
  }, [loggedIn, navigate]);

  if(!isReady){
    return <div>Loading...</div>
  }

  if(requiredRoles && !requiredRoles.includes(roleUser)){
    navigate("/login", { replace: true });
  }

  return children ? children : <Outlet />;
};

export default connect((state: PHManagerState) => ({
    loggedIn: state.session.loggedIn,
    roleUser: state.session.attrs.role
}))(PrivateRoute)
