import React from "react";
import { BsSearch } from "react-icons/bs";
const AccionesDashboard = ({ candidato }) => {
  const {
    nombre,
    apellido,
    linkedin,
    estado,
    telefono,
    mail,
    idCandidato,
    lstCompes,
  } = candidato;
  // Get the modal
  var modal = document.getElementById("exampleModal");
  // When the user clicks on the button, open the modal
  const onClick = function () {
    modal.style.display = "block";
  };

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  return (
    <>
      <tr>
        <td>
          {apellido}, {nombre}
        </td>

        <td>
          <span>{mail}</span>
        </td>
        <td>
          <span>{telefono}</span>
        </td>
        <td>
          <span>{linkedin}</span>
        </td>
        <td>
          <span>{estado}</span>
        </td>

        <td className="acciones">
          <button
            type="button"
            className="btn btn-success mr-2"
            title="Ver"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={onClick}
          >
            <BsSearch />
          </button>
        </td>
      </tr>

      <div
        class="modal"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccionesDashboard;
