using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICandidatoXCompetenciaRepositorio
    {

        public bool CreateCandXCompe(CandidatosXcompetencia candXCompe);
        public bool UpdateCandXCompe(CandidatosXcompetencia candXCompe);
        public List<CandidatosXcompetencia> GetCandXCompes(int idCandidato);
        public bool DeleteCandXCompe(CandidatosXcompetencia candXCompe);
        public bool Save();
    }
}
