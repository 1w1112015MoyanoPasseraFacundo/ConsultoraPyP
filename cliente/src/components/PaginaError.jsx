import React from 'react';
const PaginaError = () => {

    return ( 
        <section id="wrapper" class="error-page">
  <div class="error-box">
    <div class="error-body text-center">
      <div >
        <br></br>
      <img src={require("../assets/error404.gif")} alt="404"/>

        <h3 class="text-uppercase font-bold">PÁGINA NO ENCONTRADA</h3>

      </div>
      <div >
      </div>
    </div>
  </div>
</section>
     );
};
 
export default PaginaError;