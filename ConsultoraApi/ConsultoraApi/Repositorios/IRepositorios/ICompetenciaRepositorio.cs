﻿using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICompetenciaRepositorio
    {
        public Competencia GetCompetencia(int idCompetencia);
        public bool Save();
        public bool UpdateCompetencia(Competencia competencia);
        public bool CreateCompetencia(Competencia competencia);
        public bool DarDeBajaCompetencia(Competencia competencia);
    }
}
