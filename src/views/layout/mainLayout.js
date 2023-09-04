import React from "react";
import routes from '../../routes';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { Route, Switch } from 'react-router-dom';
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
        <Switch>
          {routes.map((route, idx) => {
            return route.component ? (
              <Route
                key={idx}
                path={route.path}
                exact={route.exact}
                name={route.name}
                render={(props) => (
                  <route.component
                    {...props}
                  />
                )}
              />
            ) : null;
          })}
        </Switch>
      </main>
    </div>
  );
}

export default MainLayout;
