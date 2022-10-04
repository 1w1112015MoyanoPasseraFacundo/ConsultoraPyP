import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Candidatos from "./components/Candidatos/Candidatos";
import { Provider } from "react-redux";
import store from "./store";
import Usuarios from "./components/Usuarios/Usuarios";
import NuevoUsuario from "./components/Usuarios/NuevoUsuario";
import EditarUsuario from "./components/Usuarios/EditarUsuario";
import NuevoCandidato from "./components/Candidatos/NuevoCandidato";
import EditarCandidato from "./components/Candidatos/EditarCandidato";
import Competencias from "./components/Competencias/Competencias";
import NuevaCompetencia from "./components/Competencias/NuevaCompetencia";
import EditarCompetencia from "./components/Competencias/EditarCompetencia";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Routes>
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
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
