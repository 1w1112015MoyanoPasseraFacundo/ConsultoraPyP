using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class CandidatoRepositorio : ICandidatoRepositorio
    {
        ConsultoraPypContext db;

        public CandidatoRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }

        public Candidato GetCandidato(int idCandidato)
        {
            if (idCandidato != null)
            {
                return db.Candidatos.FirstOrDefault(u => u.IdCandidato == idCandidato);
            }
            else
            {
                return null;
            }
        }
        public bool UpdateCandidato(Candidato candidato)
        {
            db.Candidatos.Update(candidato);
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

        public bool CreateCandidato(Candidato candidato)
        {
            db.Candidatos.Add(candidato);
            return Save();
        }
    }
}
