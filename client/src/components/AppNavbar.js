import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const AppNavbar = () => {

  const navigate = useNavigate();

  const onClickNavigation = (screen) => {
    navigate(`/${screen}`);
  };

  return (
    <Navbar
      style={{
        backgroundColor: "#5945d6",
        border: "2px solid white",
        color: "white",
      }}
      expand="lg"
    >
      <Container className="justify-content-center" style={{ flex: 1 }}>
        <h5
          style={{ paddingRight: "80px", cursor: "pointer" }}
          onClick={() => onClickNavigation("home")}
        >
          Home
        </h5>
        <h5
          style={{ paddingRight: "80px", cursor: "pointer" }}
          onClick={() => onClickNavigation("profile")}
        >
          Profile
        </h5>
        <h5
          style={{ cursor: "pointer" }}
          onClick={() => onClickNavigation("port-data")}
        >
          Port Data
        </h5>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
