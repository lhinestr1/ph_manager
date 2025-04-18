import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './views/NotFound';
import LoginView from './views/Login/Login/LoginContainer';
import LogOut from './views/LogOut';
import { Search } from './views/Search';
import PrivateRoute from './PrivateRoute';
import Admin from './views/Admin/Admin';

const AppRoutes = () => (
    <Routes>
        <Route 
            path='/admin' 
            element={
                <PrivateRoute>
                    <Admin />
                </PrivateRoute>
            }
        />
        <Route 
            path='/search' 
            element={
                <PrivateRoute>
                    <Search />
                </PrivateRoute>
            }
        />
        <Route path="/login" >
            <Route index element={<LoginView />} />
        </Route>
        <Route path="/logout" element={<LogOut />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
