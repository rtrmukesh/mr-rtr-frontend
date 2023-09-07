import React from 'react';
import { Route, Switch } from 'react-router-dom';
import '../node_modules/@fortawesome/fontawesome-svg-core/styles.css';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import './views/styles.scss';
import SignUp from './views/signUp';
import ToastContainer from './components/ToastContainer';
import LoginPage from './views/logIn';

function App(props) {

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
    <>
      <ToastContainer
        autoClose={4000}
        pauseOnHover={false}
        toastClassName='toastRequestSuccess'
        bodyClassName='toastBody'
      />
      <Switch>
        <Route path='/signup' component={SignUp} />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </>
  );
}

export default App;
