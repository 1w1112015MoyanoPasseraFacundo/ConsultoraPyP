using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICandidatoRepositorio
    {
        public Candidato GetCandidato(int idCandidato);
        public bool Save();
        public bool UpdateCandidato(Candidato candidato);
        public bool CreateCandidato(Candidato candidato);
    }
}
