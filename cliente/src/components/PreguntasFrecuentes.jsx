import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
const PreguntasFrecuentes = () => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);
    const handleClose3 = () => setShow3(false);
    const handleClose4 = () => setShow4(false);
    const handleShow = () => {
      setShow(true);
    };
    const handleShow1 = () => {
        setShow1(true);
      };
      const handleShow2 = () => {
        setShow2(true);
      };
      const handleShow3 = () => {
        setShow3(true);
      };
      const handleShow4 = () => {
        setShow4(true);
      };
      const navigate = useNavigate();
      const inicio = ()=>{
        navigate("/")
      }
    return (<><h1 className='title-font'>Preguntas frecuentes</h1><br/>
    <div class="card custom-card-shadow-preg" onClick={handleShow}>
    <div class="card-body"> 
    <label className='preg'>¿Cómo hago para utilizar el sistema?</label>
    </div>
    </div>
    <br/>
    <div class="card custom-card-shadow-preg" onClick={handleShow1}>
    <div class="card-body"> 
    <label className='preg'>          ¿Cómo puedo crear una nueva vacante de empleo?

</label>
    </div>
    </div>
    <br/>
    <div class="card custom-card-shadow-preg" onClick={handleShow2}>
    <div class="card-body"> 
    <label className='preg'>¿Cómo actualizo el estado de un candidato?
</label>
    </div>
    </div>
    <br/>
    <div class="card custom-card-shadow-preg" onClick={handleShow3}>
    <div class="card-body"> 
    <label className='preg'>¿A qué dirección de mail me puedo contactar para hacer una sugerencia o reclamo?
</label>
    </div>
    </div>
    <br/>
    <div class="card custom-card-shadow-preg" onClick={handleShow4}>
    <div class="card-body"> 
    <label className='preg'>¿Cómo dar de baja mi usuario?
</label>
    </div>
    </div>
    <br/>
    <Button className='pull-right' onClick={inicio}>Aceptar</Button>
    <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
          Comenzando
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Un usuario interno debe crear un nuevo usuario, donde registrará tus datos con un nombre de usuario y contraseña a definir.
          </p>
          <p>
             A partir de ahí ya puede iniciar sesión al sistema. 
          </p>
        </Modal.Body>
      </Modal>
      <Modal show={show1} onHide={handleClose1} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
          Crear una nueva vacante de empleo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
          Para crear un nuevo empleo, debemos desplegar el boton a la izquiera de la pantalla y presionar el boton de 'Empleos'.
          </p> 
          <p>
           Una vez allí, presionaremos el botón 'Nuevo' situado a la derecha y comenzaremos a llenar los datos pertinentes.
          </p>
        </Modal.Body>
      </Modal>
      <Modal show={show2} onHide={handleClose2} size="lg">
        <Modal.Header closeButton>
          <Modal.Title >
          Actualizar el estado de un candidato
                    </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>
          Para actualizar el estado de un candidato, debemos desplegar el boton a la izquiera de la pantalla y presionar el boton de 'Candidatos'.
          </p> 
          <p>
           Una vez allí, presionaremos el botón naranja de 'Cambiar estado' situado a la derecha de cada candidato y comenzaremos a llenar los datos pertinentes.
          </p>
          <p>
           Por último, seleccionamos el estado que se le quiera asignar y, opcionalmente, una observación.
          </p>
        </Modal.Body>
      </Modal>
      <Modal show={show3} onHide={handleClose3} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
          Direccion de e-mail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           Para sugerencias o reclamos, contamos con el siguiente correo electrónico:
          </p>
          <p>
          - selecciondepersonal@gestionpyp.com.ar
          </p>
        </Modal.Body>
      </Modal>
      <Modal show={show4} onHide={handleClose4} size="lg">
        <Modal.Header closeButton>
          <Modal.Title >
          Dar de baja mi usuario
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           Para dar de baja su usuario, es necesario contar el con rol de 'Admin'.
          </p>
          <p>
          Debemos desplegar el boton a la izquiera de la pantalla y presionar el boton de 'Usuarios'.
          </p> 
          <p>
           Una vez allí, presionaremos el botón rojo de 'Dar de baja' situado a la derecha de cada usuario.
          </p>
          <p>
          En caso contrario, pedir a un 'Admin' que lo realize.
          </p>
          
        </Modal.Body>
      </Modal>
     </>);
}
 
export default PreguntasFrecuentes;