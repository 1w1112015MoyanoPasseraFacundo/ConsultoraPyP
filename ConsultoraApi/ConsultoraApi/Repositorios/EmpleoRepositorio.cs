using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosEmpleos;
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

        public ICollection<Empleo> GetFilterEmpleo(EmpleoFilterDto filterDto)
        {
            var lstEmpleos = db.Empleos.ToList();

            if (filterDto.Nombre != null)
            {
                lstEmpleos = lstEmpleos.Where(c => c.Nombre.ToLower().Contains(filterDto.Nombre.ToLower())).ToList();
            }
            if (filterDto.idEstado != null)
            {
                lstEmpleos = lstEmpleos.Where(n => n.IdEstado == filterDto.idEstado).ToList();
            }
            if (filterDto.idRubro != null)
            {
                lstEmpleos = lstEmpleos.Where(n => n.IdRubro == filterDto.idRubro).ToList();
            }
            if (filterDto.idCliente != null)
            {
                lstEmpleos = lstEmpleos.Where(n => n.IdCliente == filterDto.idCliente).ToList();
            }
           

            return lstEmpleos;
        }

        public ICollection<Empleo> GetEmpleoByIdCliente(int idCliente)
        {
            if (idCliente != null)
            {
                return db.Empleos.Where(u => u.IdCliente == idCliente).ToList();
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
