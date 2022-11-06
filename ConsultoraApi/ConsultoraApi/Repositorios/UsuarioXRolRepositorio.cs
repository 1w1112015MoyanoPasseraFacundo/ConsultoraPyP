using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class UsuarioXRolRepositorio : IUsuarioXRolRepositorio
    {
        ConsultoraPypContext db;
        public UsuarioXRolRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }

        public bool CreateRolXUsuario(UsuariosXrole usuXRol)
        {
            db.UsuariosXroles.Add(usuXRol);
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
