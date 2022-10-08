using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class CandidatoXCompetenciaRepositorio : ICandidatoXCompetenciaRepositorio
    {
        ConsultoraPypContext db;
        public CandidatoXCompetenciaRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }
        public bool CreateCandXCompe(CandidatosXcompetencia candXCompe)
        {
            db.CandidatosXcompetencias.Add(candXCompe);
            return Save();
        }
        public bool UpdateCandXCompe(CandidatosXcompetencia candXCompe)
        {
            db.CandidatosXcompetencias.Update(candXCompe);
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
    }
}
