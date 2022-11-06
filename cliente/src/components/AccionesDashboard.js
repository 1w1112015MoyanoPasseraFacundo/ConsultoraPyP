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

  return (
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
        <button type="button" className="btn btn-success mr-2" title="Ver">
          <BsSearch />
        </button>
      </td>
    </tr>
  );
};

export default AccionesDashboard;
