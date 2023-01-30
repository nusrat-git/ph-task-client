import React from 'react';
import { Outlet } from 'react-router-dom';
// import Pagination from '../components/Pagination';
import Header from '../shared/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            {/* <Pagination></Pagination> */}
        </div>
    );
};

export default Main;