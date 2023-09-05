import React, { useEffect, useState } from 'react';
import { getAppNavList } from '../../nav/app';
import { Link, useLocation } from "react-router-dom";
import "./style.scss";

const HeadNav = (props) => {
  let { leftNavigationTextColor, leftNavigationBackgroundColor, leftNavigationTextHoverColor } = props;

  const [nav, setNav] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getNavList();
  }, []);

  const getNavList = async () => {
    let nav = await getAppNavList();
    setNav(nav);
  };

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const isAccountsActive = () => {
    const currentPath = location.pathname;
    return currentPath.includes("/accounts") || currentPath.includes("/accountDashboard")  || currentPath.includes("/bill") || currentPath.includes("/payment") || currentPath.includes("/salary") || currentPath.includes("/category") || currentPath.includes("/accountReports");
  };

  const isStoreActive = () => {
    const currentPath = location.pathname;
    return currentPath.includes("/locationDashboard")||currentPath.includes("/location")|| currentPath.includes("purchaseorders") || currentPath.includes("/order") || currentPath.includes("/products")|| currentPath.includes("/transfers")|| currentPath.includes("/replenish")|| currentPath.includes("/purchases")|| currentPath.includes("/stockEntry")|| currentPath.includes("/salesettlement")|| currentPath.includes("/brands")|| currentPath.includes("/categories")|| currentPath.includes("/customers")|| currentPath.includes("/vendor")|| currentPath.includes("/wishlist")|| currentPath.includes("/report")|| currentPath.includes("/salesSettlementReport")|| currentPath.includes("/stockReport")||currentPath.includes("/purchaseOrder")||currentPath.includes("/SaleSettlement")||currentPath.includes("/product")|| currentPath.includes("/inspections")|| currentPath.includes("/transferProductReport")|| currentPath.includes("/storeProductReport")|| currentPath.includes("storeProductNoStockReport")|| currentPath.includes("/storeProductNoOrderReport")|| currentPath.includes("/purchaseProductReport")|| currentPath.includes("/purchaseRecommendationReport")|| currentPath.includes("/purchaseReport")
  };

  const isJobActive=()=>{
    const currentPath = location.pathname;
    return currentPath.includes("/job") 
  }

  const isPageActive=()=>{
    const currentPath = location.pathname;
    return currentPath.includes("/page") 
  }

  const isPeopleActive=()=>{
    const currentPath = location.pathname;
    return currentPath.includes("/people") ||currentPath.includes("/attendance") ||currentPath.includes("/fine") ||currentPath.includes("/visitor") ||currentPath.includes("/users") ||currentPath.includes("/training")||currentPath.includes("/Reports") ||currentPath.includes("/user") 
  }

  const isProjectActive=()=>{
    const currentPath = location.pathname;
    return currentPath.includes("/dashboard/ticket") ||currentPath.includes("/ticket")  ||currentPath.includes("/sprint") ||currentPath.includes("/Sprint") ||currentPath.includes("/recurringTask")
  }

  const isMyDashboardActive=()=>{
    const currentPath=location.pathname
    return currentPath.includes("/mydashboard")
  }
  return (
    <div className="nav-link d-lg-flex d-none align-items-center p-0">
      {nav && nav.length > 0 && nav.map((item, index) => (
        <Link
          to={item.url}
          className="nav-link pl-2"
          style={{
            color: leftNavigationTextColor,
            backgroundColor:isMyDashboardActive() && item.name === "My Dashboard" ? leftNavigationBackgroundColor: isAccountsActive() && item.name === "Accounts" ? leftNavigationBackgroundColor : (isStoreActive() && item.name === "Commerce") ? leftNavigationBackgroundColor : isJobActive() && item.name === "Jobs" ? leftNavigationBackgroundColor:isPageActive() && item.name === "Pages" ? leftNavigationBackgroundColor:isPeopleActive() && item.name === "Peoples" ? leftNavigationBackgroundColor:isProjectActive() && item.name === "Projects" ? leftNavigationBackgroundColor:""
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          key={index}
        >
          <div
            style={{
              color: hoveredIndex === index ? leftNavigationTextHoverColor : leftNavigationTextColor
            }}
          >
            {item.name}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HeadNav;
