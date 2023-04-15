import routes from "./routes";
import { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './views/styles.scss';
import Sidebar from './views/sidBar';


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
          {routes.map(({ component, path }, index) => (
            <Route key={index} path={path} exact render={component} />
          ))}
        </Switch>
      </main>
    </div>
  );
}

export default App;

