using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosUsuarios;
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
        public ICollection<Candidato> GetFilterCandidato(CandidatoFilterDto filterDto)
        {
            var lstCandidatos = db.Candidatos.ToList();
            if (filterDto.estado != null)
            {
                if (filterDto.estado == "Preseleccionado")
                {
                    lstCandidatos = lstCandidatos.Where(u => u.Estado == filterDto.estado).ToList();
                }
                if (filterDto.estado == "En proceso")
                {
                    lstCandidatos = lstCandidatos.Where(u => u.Estado == filterDto.estado).ToList();
                }
                if (filterDto.estado == "Descartado")
                {
                    lstCandidatos = lstCandidatos.Where(u => u.Estado == filterDto.estado).ToList();
                }
                if (filterDto.estado == "Postulado")
                {
                    lstCandidatos = lstCandidatos.Where(u => u.Estado == filterDto.estado).ToList();
                }
                if (filterDto.estado == "En base")
                {
                    lstCandidatos = lstCandidatos.Where(u => u.Estado == filterDto.estado).ToList();
                }
                if (filterDto.estado == "Seleccionado")
                {
                    lstCandidatos = lstCandidatos.Where(u => u.Estado == filterDto.estado).ToList();
                }
            }
            if (filterDto.nombre != null)
            {
                lstCandidatos = lstCandidatos.Where(c => c.Nombre.ToLower().Contains(filterDto.nombre.ToLower())).ToList();
            }
            if (filterDto.apellido != null)
            {
                lstCandidatos = lstCandidatos.Where(c => c.Apellido.ToLower().Contains(filterDto.apellido.ToLower())).ToList();
            }
            
            return lstCandidatos;
        }
        public bool UpdateCandidato(Candidato candidato)
        {
            db.Candidatos.Update(candidato);
            return Save();
        }
        public bool MailExists(string mail)
        {
            return db.Candidatos.Any(u => u.Mail.ToLower() == mail.ToLower());
        }
        public bool MailExists(int idCandidato, string mail)
        {
            return db.Candidatos.Any(u => u.IdCandidato != idCandidato && u.Mail.ToLower() == mail.ToLower());
        }
        public bool CandidatoExists(int documento)
        {
            return db.Candidatos.Any(u => u.Documento== documento);
        }
        public bool CandidatoExists(int idCandidato, int documento)
        {
            return db.Candidatos.Any(u => u.IdCandidato != idCandidato && u.Documento == documento);
        }
        public bool DarDeBajaCandidato(Candidato candidato)
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
