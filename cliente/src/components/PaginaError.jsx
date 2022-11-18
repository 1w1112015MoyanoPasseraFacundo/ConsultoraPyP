import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const PaginaError = () => {
    const navigate = useNavigate();
    const inicio = ()=>{
        navigate("");
    }
    return ( 
        <section id="wrapper" class="error-page">
  <div class="error-box">
    <div class="error-body text-center">
      <div >
        <br></br>
      <img src={require("../assets/error404.gif")} />

        <h3 class="text-uppercase font-bold">PÁGINA NO ENCONTRADA</h3>
        {/* <a
          href="index.html"
          class="my btn btn-info waves-effect waves-light m-b-40"
          onClick={inicio}
          >Volver al Inicio</a
        > */}
      </div>
      <div >
      </div>
    </div>
  </div>
</section>
     );
};
 
export default PaginaError;