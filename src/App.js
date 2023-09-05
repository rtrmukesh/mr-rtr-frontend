import React from "react";
import { Route, Switch } from 'react-router-dom';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import './views/styles.scss';
import SignUp from "./views/signUp";

function App() {
 

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
