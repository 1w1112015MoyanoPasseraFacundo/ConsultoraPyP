using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IUsuarioRepositorio
    {

        public Usuario GetUsuario(int idUsuario);

        public bool CreateUsuario(Usuario usuario);
        public bool UpdateUsuario(Usuario usuario);
        public bool DarDeBajaUsuario(Usuario usuario);
        public bool Save();
    }
}
