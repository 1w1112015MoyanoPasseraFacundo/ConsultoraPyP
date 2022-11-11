using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICompetenciaRepositorio
    {
        public Competencia GetCompetencia(int idCompetencia);
        public bool Save();
        public bool UpdateCompetencia(Competencia competencia);
        public bool CompetenciaExists(string competencia);
        public bool CompetenciaExists(int idRubro);
        public bool CompetenciaExists(int idCompetencia, string competencia);
        public bool CompetenciaExists(int idCompetencia, int idRubro);
        public bool CreateCompetencia(Competencia competencia);
        public ICollection<Competencia> GetCompetenciaByIdRubro(int idRubro);
        public bool DarDeBajaCompetencia(Competencia competencia);
        public ICollection<Competencia> GetFilterCompetencia(CompetenciaFilterDto filterDto);
    }
}
