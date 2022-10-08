using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICandidatoXCompetenciaRepositorio
    {

        public bool CreateCandXCompe(CandidatosXcompetencia candXCompe);
        public bool UpdateCandXCompe(CandidatosXcompetencia candXCompe);
        public bool Save();
    }
}
