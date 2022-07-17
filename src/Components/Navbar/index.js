import React, { Component } from "react";

import "../../App.css";
import {Nav , NavLink, Bars, NavMenu } from './NavbarEle'
export default class NavBar extends Component {
  render() {
    return (
      <>
        <Nav>
          <NavLink to="/">
            <img src={require("../../images/logo.svg")} alt="logo" />
            <h1 className="logo">COVID-19 TRACKER</h1>
          </NavLink>
          <Bars />
          <NavMenu>
            <NavLink to="/">Home</NavLink>
            {/* <NavLink to='/news' >
            News
          </NavLink> */}
            <NavLink to="/5k">5K</NavLink>
          </NavMenu>
        </Nav>
      </>
    );
  }
}
