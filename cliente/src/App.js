import React, { Fragment, useState } from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Candidatos from "./components/Candidatos/Candidatos";
import { Provider } from "react-redux";
import "bootswatch/dist/lumen/bootstrap.min.css";
import store from "./store";
import Usuarios from "./components/Usuarios/Usuarios";
import NuevoUsuario from "./components/Usuarios/NuevoUsuario";
import EditarUsuario from "./components/Usuarios/EditarUsuario";
import NuevoCandidato from "./components/Candidatos/NuevoCandidato";
import EditarCandidato from "./components/Candidatos/EditarCandidato";
import Competencias from "./components/Competencias/Competencias";
import NuevaCompetencia from "./components/Competencias/NuevaCompetencia";
import EditarCompetencia from "./components/Competencias/EditarCompetencia";
import Clientes from "./components/Clientes/Clientes";
import NuevoCliente from "./components/Clientes/NuevoCliente";
import EditarCliente from "./components/Clientes/EditarCliente";
import Empleos from "./components/Empleos/Empleos";
import NuevoEmpleo from "./components/Empleos/NuevoEmpleo";
import EditarEmpleo from "./components/Empleos/EditarEmpleo";
import Pagos from "./components/Pagos/Pagos";
import NuevoPago from "./components/Pagos/NuevoPago";
import EditarPago from "./components/Pagos/EditarPago";
import Login from "./login/Login";
import Dashboard from "./components/dashboard";
import RutaPrivada from "./components/RutaPrivada";
import Reportes from "./components/Reportes/Reportes";
import { usuarioAutenticado } from "./login/authActions";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<RutaPrivada />}>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/reportes" element={<Reportes />} />
            <Route exact path="/candidatos" element={<Candidatos />} />
            <Route
              exact
              path="/candidatos/nuevo"
              element={<NuevoCandidato />}
            />
            <Route
              exact
              path="/candidatos/editar/:id"
              element={<EditarCandidato />}
            />
            <Route exact path="/usuarios" element={<Usuarios />} />
            <Route exact path="usuarios/nuevo" element={<NuevoUsuario />} />
            <Route
              exact
              path="/usuarios/editar/:id"
              element={<EditarUsuario />}
            />
            <Route exact path="/competencias" element={<Competencias />} />
            <Route
              exact
              path="/competencias/nuevo"
              element={<NuevaCompetencia />}
            />
            <Route
              exact
              path="/competencias/editar/:id"
              element={<EditarCompetencia />}
            />
            <Route exact path="/clientes" element={<Clientes />} />
            <Route exact path="/clientes/nuevo" element={<NuevoCliente />} />
            <Route
              exact
              path="/clientes/editar/:id"
              element={<EditarCliente />}
            />
            <Route exact path="/empleos" element={<Empleos />} />
            <Route exact path="/empleos/nuevo" element={<NuevoEmpleo />} />
            <Route
              exact
              path="/empleos/editar/:id"
              element={<EditarEmpleo />}
            />
            <Route exact path="/pagos" element={<Pagos />} />
            <Route exact path="/pagos/nuevo" element={<NuevoPago />} />
            <Route exact path="/pagos/editar/:id" element={<EditarPago />} />
          </Route>
        </Routes>
      </Provider>
    </Router>
  );
}

export default App;
