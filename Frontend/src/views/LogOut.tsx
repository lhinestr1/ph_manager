/* eslint react-hooks/exhaustive-deps: 0 */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { PHManagerState } from '../store';
import { useNavigate } from 'react-router-dom';
import { logoutRequest } from '../store/actions/session';

interface Props {
  logout(): void;
  loggedIn: boolean;
}

const LogOut: React.FC<Props> = ({
  logout,
  loggedIn
}) => {

  const navegate = useNavigate();

  useEffect(() => {
      if (loggedIn) logout();
  }, [loggedIn]);

  useEffect(() => {
    if  (!loggedIn) {
      navegate("/login");
    }
  }, [loggedIn]);

  return null;
};

export default connect(
  (state: PHManagerState) => ({
    loggedIn: state.session.loggedIn,
  }),
  (dispatch) => ({
    logout() {
      dispatch(logoutRequest());
    },
  })
)(LogOut);
