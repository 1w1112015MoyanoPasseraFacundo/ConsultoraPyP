import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Candidatos from "./components/Candidatos/Candidatos";
import { Provider } from "react-redux";
import store from "./store";
import Usuarios from "./components/Usuarios/Usuarios";
import NuevoUsuario from "./components/Usuarios/NuevoUsuario";
import EditarUsuario from "./components/Usuarios/EditarUsuario";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div className="container mt-5">
          <Routes>
            <Route exact path="/candidatos" element={<Candidatos />} />
            <Route exact path="/usuarios" element={<Usuarios />} />
            <Route exact path="usuarios/nuevo" element={<NuevoUsuario />} />
            <Route
              exact
              path="/usuarios/editar/:id"
              element={<EditarUsuario />}
            />
          </Routes>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
