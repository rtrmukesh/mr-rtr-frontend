import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaGem,
  FaTachometerAlt,
  FaUser,
} from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import AnimationButton from "../../components/MyComponents/AnimationButton";
import { isLoggedIn, setCookie } from "../../lib/Helper";
import { COOKIE_SESSION_TOKEN } from "../../lib/Cookie";

const Sidebar = ({
  image,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  const handleLogOut = () => {
    setCookie(COOKIE_SESSION_TOKEN, "");
    isLoggedIn();
  };

  return (
    <ProSidebar
      //   image={image ? sidebarBg : false}
      collapsed={collapsed}
      toggled={toggled}
      onToggle={handleToggleSidebar}
      breakPoint="md"
    >
      {/* Header */}
      <SidebarHeader>
        <Menu iconShape="circle">
          {collapsed ? (
            <MenuItem
              icon={<FaAngleDoubleRight />}
              onClick={handleCollapsedChange}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<FaAngleDoubleLeft />}
              onClick={handleCollapsedChange}
            >
              <div
                style={{
                  padding: "9px",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  fontSize: 15,
                  letterSpacing: "1px",
                }}
              >
                Menus
              </div>
            </MenuItem>
          )}
        </Menu>
      </SidebarHeader>
      {/* Content */}
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem
            icon={<FaTachometerAlt />}
            suffix={<span className="badge red">NEW</span>}
          >
            Dashboard
            <NavLink to="/" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Table <Link to="/table" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Components <Link to="/components" />
          </MenuItem>
          <MenuItem icon={<FaGem />}>
            Login <Link to="/login" />
          </MenuItem>
        </Menu>
      </SidebarContent>
      {/* Footer */}
      <SidebarFooter style={{ textAlign: "center" }}>
        <div className="sidebar-btn-wrapper" style={{ padding: "16px" }}>
          <Link
            className="sidebar-btn"
            style={{ cursor: "pointer" }}
            to="/profile"
          >
            <FaUser />
            <span>My Account</span>
          </Link>
        </div>
        <AnimationButton label="Logout" onClick={handleLogOut} />
      </SidebarFooter>
    </ProSidebar>
  );
};

export default Sidebar;
