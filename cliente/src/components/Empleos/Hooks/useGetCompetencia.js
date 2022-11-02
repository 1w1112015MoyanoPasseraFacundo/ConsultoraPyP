import React, { useState, useEffect } from "react";
import clienteAxios from "../../../config/axios";

export const useGetCompetencia = (idRubro) => {
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const obtenerCompe = async () => {
      try {
        const response = await clienteAxios.get(
          `Competencias/GetCompetenciasByIdRubro?idRubro=${idRubro}`
        );
        const dato = await response.data;
        console.log(dato);
        setData(dato);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsError(error);
        setIsLoading(false);
      }
    };
    obtenerCompe();
  }, [idRubro]);
  return { data: data ?? [], loading: isLoading, error: isError };
};
