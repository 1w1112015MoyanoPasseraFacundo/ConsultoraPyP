using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICompetenciaRepositorio
    {
        public Competencia GetCompetencia(int idCompetencia);
        public bool Save();
        public bool UpdateCompetencia(Competencia competencia);
        public bool CreateCompetencia(Competencia competencia);
        public ICollection<Competencia> GetCompetenciaByIdRubro(int idRubro);
        public bool DarDeBajaCompetencia(Competencia competencia);
        public ICollection<Competencia> GetFilterCompetencia(CompetenciaFilterDto filterDto);
    }
}
