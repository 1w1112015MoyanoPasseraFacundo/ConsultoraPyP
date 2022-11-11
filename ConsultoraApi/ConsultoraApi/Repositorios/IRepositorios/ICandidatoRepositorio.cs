using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICandidatoRepositorio
    {
        public Candidato GetCandidato(int idCandidato);
        public bool Save();
        public bool UpdateCandidato(Candidato candidato);
        public bool MailExists(string mail);
        public bool MailExists(int idCandidato, string mail);
        public bool CandidatoExists(int documento);
        public bool CandidatoExists(int idCandidato, int documento);
        public ICollection<Candidato> GetFilterCandidato(CandidatoFilterDto filterDto);
        public bool CreateCandidato(Candidato candidato);
        public bool DarDeBajaCandidato(Candidato candidato);
    }
}
