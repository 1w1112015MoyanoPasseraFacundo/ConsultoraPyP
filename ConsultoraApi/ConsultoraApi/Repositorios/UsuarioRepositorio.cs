using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class UsuarioRepositorio : IUsuarioRepositorio
    {
        ConsultoraPypContext db;


        public UsuarioRepositorio(ConsultoraPypContext db)
        {
            this.db = db;
        }

        public Usuario GetUsuario(int idUsuario)
        {
            if (idUsuario != null)
            {
                return db.Usuarios.FirstOrDefault(u => u.IdUsuario == idUsuario);
            }
            else
            {
                return null;
            }
        }
        public ICollection<Usuario> GetFilterUsuario(UsuarioFilterDto filterDto)
        {
            var lstUsuarios = db.Usuarios.ToList();
            if (filterDto.estado != null)
            {
                if (filterDto.estado == "SI")
                {
                    lstUsuarios = lstUsuarios.Where(u => u.FechaSalida == null).ToList();
                }
                if (filterDto.estado == "NO")
                {
                    lstUsuarios = lstUsuarios.Where(u => u.FechaSalida != null).ToList();
                }
            }
            if (filterDto.nombreUsuario != null)
            {
                lstUsuarios = lstUsuarios.Where(c => c.NombreUsuario.ToLower().Contains(filterDto.nombreUsuario.ToLower())).ToList();
            }
            if (filterDto.cuil != null)
            {
                lstUsuarios = lstUsuarios.Where(n => n.Cuil.Contains(filterDto.cuil)).ToList();
            }

            return lstUsuarios;
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

        public bool CreateUsuario(Usuario usuario)
        {
            db.Usuarios.Add(usuario);
            return Save();
        }
        public bool UsuarioExists(string NombreUsuario)
        {
            return db.Usuarios.Any(u => u.NombreUsuario.ToLower() == NombreUsuario.ToLower());
        }
        public bool MailExists(string mail)
        {
            return db.Usuarios.Any(u => u.Mail.ToLower() == mail.ToLower());
        }
        public bool NumeroDocumentoExists(int NumeroDocumento)
        {
            return db.Usuarios.Any(u => u.Documento == NumeroDocumento);
        }
        public bool UpdateUsuario(Usuario usuario)
        {
            db.Usuarios.Update(usuario);
            return Save();
        }
        public bool DarDeBajaUsuario(Usuario usuario)
        {
            db.Usuarios.Update(usuario);
            return Save();
        }
    }
}
