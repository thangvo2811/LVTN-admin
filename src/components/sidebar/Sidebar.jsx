import React from "react";

import { Link } from "react-router-dom";

import "../../scss/index.scss";

import logo from "../../assets/images/man.png";

// import sidebar_items from "../../assets/JsonData/sidebar_routes";
import sidebar_items from "../../assets/JsonData/sidebar_routes";
import sidebar_staff from "../../assets/JsonData/sidebar_routes-staff.json";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <i className={props.icoj}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const roleUser = localStorage.getItem("role");

  console.log("first", roleUser);
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname
  );
  const activeStaff = sidebar_staff.findIndex(
    (item) => item.route === props.location.pathname
  );

  return (
    // {role === "1" ? ():()}
    <>
      {roleUser === "1" ? (
        <div className="sidebar">
          <div className="sidebar__logo">
            <img src={logo} alt="company logo" />
          </div>
          {sidebar_items.map((item, index) => (
            <Link to={item.route} key={index}>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeItem}
              />
            </Link>
          ))}
        </div>
      ) : roleUser === "2" ? (
        <div className="sidebar">
          <div className="sidebar__logo">
            <img src={logo} alt="company logo" />
          </div>
          {sidebar_staff.map((item, index) => (
            <Link to={item.route} key={index}>
              <SidebarItem
                title={item.display_name}
                icon={item.icon}
                active={index === activeStaff}
              />
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
