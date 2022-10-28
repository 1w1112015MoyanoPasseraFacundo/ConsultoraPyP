using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using Microsoft.EntityFrameworkCore;

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
        public ICollection<Competencia> GetCompetenciaByIdRubro(int idRubro)
        {
            if (idRubro != null)
            {
                return db.Competencias.Where(u => u.IdRubro == idRubro).ToList();
            }
            else
            {
                return null;
            }
        }
        public ICollection<Competencia> GetFilterCompetencia(CompetenciaFilterDto filterDto)
        {
            var lstCompes = db.Competencias.ToList();
           
            if (filterDto.Nombre != null)
            {
                lstCompes = lstCompes.Where(c => c.Nombre.ToLower().Contains(filterDto.Nombre.ToLower())).ToList();
            }
            if (filterDto.idRubro != null)
            {
                lstCompes = lstCompes.Where(n => n.IdRubro==filterDto.idRubro).ToList();
            }

            return lstCompes;
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
