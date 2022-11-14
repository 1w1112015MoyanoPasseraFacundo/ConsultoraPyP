import Cookies from "js-cookie";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { usuarioAutenticado } from "../login/authActions";
import Header from "./Header";
import SideBar from "./SideBar";

const RutaPrivada = ({ element: Component, ...props }) => {

const token = localStorage.getItem("token");

    // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return token ?(
    <>
        <Header />
        <SideBar /> 
      <div className="container cont mt-5 min-vw-90"> 
        <Outlet /> 
      </div>
    </>
    ): <Navigate to="/login" />
};

export default RutaPrivada;
