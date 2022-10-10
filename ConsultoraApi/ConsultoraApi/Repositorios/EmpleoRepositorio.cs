using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class EmpleoRepositorio : IEmpleoRepositorio
    {
        ConsultoraPypContext db;

        public EmpleoRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }

        public Empleo GetEmpleo(int idEmpleo)
        {
            if (idEmpleo != null)
            {
                return db.Empleos.FirstOrDefault(u => u.IdEmpleo == idEmpleo);
            }
            else
            {
                return null;
            }
        }
        public bool UpdateEmpleo(Empleo empleo)
        {
            db.Empleos.Update(empleo);
            return Save();
        }

        public bool DarDeBajaEmpleo(Empleo empleo)
        {
            db.Empleos.Update(empleo);
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

        public bool CreateEmpleo(Empleo empleo)
        {
            db.Empleos.Add(empleo);
            return Save();
        }
    }
}
