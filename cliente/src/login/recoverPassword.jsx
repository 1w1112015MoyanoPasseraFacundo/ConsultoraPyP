import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { recoverPassword } from './authActions';
const RecoverPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = ()=>{
        navigate("/login");
    }
    const [email, guardarMail] = useState("");
    console.log(email);
    const onSubmit = (e) => {
        e.preventDefault();
    try{
    // validar campos vacios
    if (email.trim() === "") {
      Swal.fire("Llene el e-mail", "Intenta de nuevo", "error");
    }
     dispatch(recoverPassword(email));
     navigate("/login");
    }catch(error){
     navigate("/login");

    }
  };
    return (  <>
    <img src={require("../assets/login-bg.png")} class="bg-reset-pass" />
<div class="recover-register d-flex h-100">
  <div class="recover-box card">
    <div class="card-body rounded">

        <h3 class="text-info">
          <span class="lstick"></span>Cambiar contraseña
        </h3>
        <div class="form-group">
            <p>Ingrese su email y le enviaremos un correo con una nueva contraseña.</p>
          <div class="col-xs-12">
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                name="email"
                value={email}
                placeholder="Email"
                onChange={(e) => guardarMail(e.target.value)}
                />
            </div>
          </div>
        </div>

        <div class="form-group text-center m-t-20">
          <div class="col-xs-12 d-flex justify-content-center">
            <button
              class="btn btn-primary p-10 w-50 waves-effect waves-light"
              type="submit"
              onClick={onSubmit}
            >
              Aceptar
            </button>
            <button
              class="btn btn-secondary p-10 w-50 waves-effect waves-light mx-2"
              onClick={login}
            >
              Cancelar
            </button>
          </div>
        </div>
    </div>
  </div>
</div>

    </>);
}
 
export default RecoverPassword;