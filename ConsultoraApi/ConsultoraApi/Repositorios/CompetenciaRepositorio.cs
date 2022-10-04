using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class CompetenciaRepositorio : ICompetenciaRepositorio
    {
        ConsultoraPypContext db;

        public CompetenciaRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }

        public Competencia GetCompetencia(int idCompetencia)
        {
            if (idCompetencia != null)
            {
                return db.Competencias.FirstOrDefault(u => u.IdCompetencia == idCompetencia);
            }
            else
            {
                return null;
            }
        }
        public bool UpdateCompetencia(Competencia competencia)
        {
            db.Competencias.Update(competencia);
            return Save();
        }

        public bool DarDeBajaCompetencia(Competencia competencia)
        {
            db.Competencias.Update(competencia);
            return Save();
        }
        public bool Save()
        {
            try
            {
                return db.SaveChanges() > 0 ? true : false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool CreateCompetencia(Competencia competencia)
        {
            db.Competencias.Add(competencia);
            return Save();
        }
    }
}
