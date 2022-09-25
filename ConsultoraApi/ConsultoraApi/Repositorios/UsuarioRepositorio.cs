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
