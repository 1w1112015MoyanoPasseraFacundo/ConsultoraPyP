using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosEmpleos;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using Microsoft.EntityFrameworkCore;
using System.Linq;

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
        public Estado GetEstado(string nombreEstado)
        {
            return db.Estados.FirstOrDefault(r => r.Nombre == nombreEstado);
        }
        public List<Empleo> GetEmpleoPorMes(int mes)
        {
            return db.Empleos.Where(r => r.FechaAlta.Month == mes && r.IdEstado == 1002).ToList();

        }
        public ICollection<ReporteDto> GetEmpleosPorMes(int mes)
        {
            var data = db.Empleos.Where(r => r.FechaAlta.Month == mes && r.IdEstado == 1002).GroupBy(r => r.IdCliente).Select(r => new ReporteDto()
            {
                idCliente = r.Key,
                countCliente = r.Sum(s=>s.IdCliente)/r.Key
            }).ToList();
            return data;

        }
        public ICollection<ReporteDto> GetEmpleosPoFecha(DateTime fecha1, DateTime fecha2)
        {
            var data = db.Empleos.Where(x => x.FechaAlta.Date >= fecha1.Date && x.FechaAlta.Date <= fecha2.Date && x.IdEstado == 1002).GroupBy(r => r.IdCliente).Select(r => new ReporteDto()
            {
                idCliente = r.Key,
                countCliente = r.Sum(s => s.IdCliente) / r.Key
            }).ToList();
            return data;

        }
        public ICollection<EmpleoReporte2Dto> GetEstadoEmpleosPoFecha(DateTime fecha1, DateTime fecha2)
        {
            var data = db.Empleos.Where(x => x.FechaAlta.Date >= fecha1.Date && x.FechaAlta.Date <= fecha2.Date).GroupBy(r => r.IdEstado).Select(r => new EmpleoReporte2Dto()
            {
                idEstado = r.Key,
                countEstado = r.Sum(s => s.IdEstado) / r.Key
            }).ToList();
            return data;
        }
        public ICollection<EmpleoReporte2Dto> GetEstadoEmpleos()
        {
            var data = db.Empleos.GroupBy(r => r.IdEstado).Select(r => new EmpleoReporte2Dto()
            {
                idEstado = r.Key,
                countEstado = r.Sum(s => s.IdEstado) / r.Key
            }).ToList();
            return data;
        }
        public ICollection<ReporteDto> GetEmpleosSinMes()
        {
            var data = db.Empleos.Where(r => r.IdEstado == 1002).GroupBy(r => r.IdCliente).Select(r => new ReporteDto()
            {
                idCliente = r.Key,
                countCliente = r.Sum(s => s.IdCliente) / r.Key
            }).ToList();
            return data;

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
