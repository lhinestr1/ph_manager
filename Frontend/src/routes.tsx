import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './views/NotFound';
import LoginView from './views/Login/Login/LoginContainer';
import LogOut from './views/LogOut';
import { Search } from './views/Search';
import PrivateRoute from './PrivateRoute';
import Admin from './views/Admin/Admin';
import AdminApartment from './views/AdminApartment/AdminApartment';

const AppRoutes = () => (
    <Routes>
        <Route element={<PrivateRoute/>}>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="admin/apartment/:apartmentId" element={<AdminApartment />} />
        </Route>
        <Route path="/login" >
            <Route index element={<LoginView />} />
        </Route>
        <Route path="/logout" element={<LogOut />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
);

export default AppRoutes;
