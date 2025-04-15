import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './views/NotFound';
import LoginView from './views/Login/Login/LoginContainer';
import LogOut from './views/LogOut';
import { Search } from './views/Search';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => (
    <Routes>
        <Route 
            path='/' 
            element={
                <PrivateRoute>
                    <div>Bienvenido a HPManager</div>
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
        {/*<PrivateRoute2 Component={Search} path='/search' />*/}
        <Route path="/login" >
            <Route index element={<LoginView />} />
            {/*<Route path="recovery" element={<ResetPasswordView />} />*/}
            {/*<Route path="register" element={<RegisterView />} />*/}
        </Route>
        <Route path="/logout" element={<LogOut />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
