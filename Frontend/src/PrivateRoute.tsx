import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate , Outlet } from 'react-router-dom';
import { PHManagerState } from './store';
import readySelector from './store/selectors/readySelector';

interface Props {
  loggedIn: boolean
  children?: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({
  loggedIn,
  children
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

  return children ? children : <Outlet />;
};

export default connect((state: PHManagerState) => ({
    loggedIn: state.session.loggedIn,
}))(PrivateRoute)
