using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IUsuarioXRolRepositorio
    {
        public bool CreateRolXUsuario(UsuariosXrole usuXRol);
        public bool Save();
    }
}
