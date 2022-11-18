using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using System.Text.RegularExpressions;

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
        public Usuario GetUsuario(string mail)
        {
            if (mail != null)
            {
                return db.Usuarios.FirstOrDefault(u => u.Mail == mail);
            }
            else
            {
                return null;
            }
        }
        public ICollection<Usuario> GetListUsuario(int idUsuario)
        {
            if (idUsuario != null)
            {
                return db.Usuarios.Where(u => u.IdUsuario == idUsuario).ToList();
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
         public bool UsuarioExists(int idUsuario, string NombreUsuario)
        {
            return db.Usuarios.Any(u => u.IdUsuario != idUsuario && u.NombreUsuario.ToLower() == NombreUsuario.ToLower());
        }
        public bool MailExists(int idUsuario, string mail)
        {
            return db.Usuarios.Any(u => u.IdUsuario != idUsuario && u.Mail.ToLower() == mail.ToLower());
        }

        public bool NumeroDocumentoExists(int idUsuario, int NumeroDocumento)
        {
            return db.Usuarios.Any(u => u.IdUsuario != idUsuario && u.Documento == NumeroDocumento);
        }
        public bool IsValid(string emailaddress)
        {
            var regex = @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,7})+)$";
            bool isValid = Regex.IsMatch(emailaddress, regex, RegexOptions.IgnoreCase);
            return isValid;
        }
        public int validarEdad(DateTime fechaNac)
        {
            DateTime fechaHoy = DateTime.Now;
            int diaActual = fechaHoy.DayOfYear;
            int diaNac = fechaNac.DayOfYear;

            //SI NACIO UN DIA DEL AÑO ANTERIOR AL DIA DEL AÑO ACTUAL, RESTAR LOS AÑOS COMUNMENTE 
            int edad = fechaHoy.Year - fechaNac.Year;


            //VALIDAR SI LOS AÑOS SON BISIESTOS
            if (fechaHoy.Year % 4 == 0 && fechaHoy.Year % 100 != 0 || fechaHoy.Year % 400 == 0)
            {
                diaActual--;
            }
            if (fechaNac.Year % 4 == 0 && fechaNac.Year % 100 != 0 || fechaNac.Year % 400 == 0)
            {
                diaNac--;
            }

            //SI NACIO UN DIA DEL AÑO POSTERIOR AL DIA DEL AÑO ACTUAL, RESTAR UN AÑO AL RESULTADO DE LA RESTA DE AÑOS COMUN 
            if (diaActual < diaNac)
            {
                edad--;
            }
            return edad;
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
