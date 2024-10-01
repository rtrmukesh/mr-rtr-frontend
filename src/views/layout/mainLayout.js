import React from "react";
import routes from '../../routes';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Route, Routes } from 'react-router-dom'; // Updated import
import Sidebar from '../../views/sidBar/sidBar';
import '../../views/styles.scss';

function MainLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value) => {
    setToggled(value);
  };

  return (
    <div className={`app ${toggled ? 'toggled' : ''}`}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
      />
      <main>
        <div className='btn-toggle' onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Routes> {/* Updated to Routes */}
          {routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                element={<route.component />} // Use element instead of render
              />
            ) : null;
          })}
        </Routes>
      </main>
    </div>
  );
}

export default MainLayout;
