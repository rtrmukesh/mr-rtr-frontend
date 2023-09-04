import React, { useState } from "react";
import { Route, Router, Switch } from 'react-router-dom';

import "../node_modules/draft-js/dist/Draft.css";
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './views/styles.scss';
import SignUp from "./views/signUp";

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
    // <div className={`app ${toggled ? 'toggled' : ''}`}>
    //   <Sidebar
    //     collapsed={collapsed}
    //     toggled={toggled}
    //     handleToggleSidebar={handleToggleSidebar}
    //     handleCollapsedChange={handleCollapsedChange}
    //   />
    //   <main>
    //     <div className='btn-toggle' onClick={() => handleToggleSidebar(true)}>
    //       <FaBars />
    //     </div>
    //     <Switch>
    //       {routes.map((route, idx) => {
    //         return route.component ? (
    //           <Route
    //             key={idx}
    //             path={route.path}
    //             exact={route.exact}
    //             name={route.name}
    //             render={(props) => (
    //               <route.component
    //                 {...props}
    //               />
    //             )}
    //           />
    //         ) : null;
    //       })}
    //     </Switch>
    //   </main>
    // </div>
    // <MainLayout/>
      <Switch>
        <Route path="/signup" component={SignUp} />
      </Switch>
  );
}

export default App;
