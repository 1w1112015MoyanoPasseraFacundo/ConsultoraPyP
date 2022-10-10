using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class EmpleoXCompetenciaRepositorio : IEmpleoXCompetenciaRepositorio
    {
        ConsultoraPypContext db;
        public EmpleoXCompetenciaRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }
        public bool CreateEmpleoXCompe(EmpleosXcompetencia emplXCompe)
        {
            db.EmpleosXcompetencias.Add(emplXCompe);
            return Save();
        }
        public List<EmpleosXcompetencia> GetEmpleosXCompes(int idEmpleo)
        {
            if (idEmpleo != null)
            {
                return db.EmpleosXcompetencias.Where(u => u.IdEmpleo == idEmpleo).ToList();
            }
            else
            {
                return null;
            }
        }
        public bool UpdateEmpleoXCompe(EmpleosXcompetencia emplXCompe)
        {
            db.EmpleosXcompetencias.Add(emplXCompe);
            return Save();
        }
        public bool DeleteEmpleoXCompe(EmpleosXcompetencia emplXCompe)
        {
            db.EmpleosXcompetencias.Remove(emplXCompe);
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
