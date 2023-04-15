// import "./App.css";
// import React from "react";
import routes from "./routes";
// import { BrowserRouter, Route } from "react-router-dom";
// import LoginPage from "./views/loginPage";

// function App() {




//   return (
//     <>
//       <div className="wrapper">
//         <BrowserRouter>
//           {routes.map(({ component, path }, index) => (
//             <Route key={index} path={path} exact render={component} />
//           ))}
//         </BrowserRouter>
//       </div>
//     </>
//   );
// }

// export default App;


import { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import './views/styles.scss';
import Sidebar from './views/sidBar';
import ReactTable from './views/Table';
import Components from './views/terox';

function App() {
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
        <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
          <FaBars />
        </div>
        <Switch>
          {/* <Route path="/table"  component={ReactTable} />
          <Route path="/components" component={Components} /> */}
          {/* <Redirect to="/not-found" /> */}
          {routes.map(({ component, path }, index) => (
            <Route key={index} path={path} exact render={component} />
          ))}
        </Switch>
      </main>
    </div>
  );
}

export default App;

