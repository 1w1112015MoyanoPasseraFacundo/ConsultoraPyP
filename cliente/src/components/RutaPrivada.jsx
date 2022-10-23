import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { usuarioAutenticado } from "../login/authActions";
import Header from "./Header";
import SideBar from "./SideBar";

const RutaPrivada = ({ element: Component, ...props }) => {
    const dispatch = useDispatch();
    const autenticado = useSelector((state) => state.login.autenticado);
    console.log(autenticado);
    useEffect(() => {
    dispatch(usuarioAutenticado());
  }, []);
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return autenticado ?<Fragment><Header />
  <SideBar /> <Outlet /> </Fragment>: <Navigate to="/login" />;
};

export default RutaPrivada;
