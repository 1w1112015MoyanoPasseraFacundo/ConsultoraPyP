using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IUsuarioRepositorio
    {

        public Usuario GetUsuario(int idUsuario);
        public ICollection<Usuario> GetFilterUsuario(UsuarioFilterDto filterDto);
        public bool CreateUsuario(Usuario usuario);
        public bool UsuarioExists(string NombreUsuario);
        public bool NumeroDocumentoExists(int NumeroDocumento);
        public bool MailExists(string mail);

        public bool UpdateUsuario(Usuario usuario);
        public bool DarDeBajaUsuario(Usuario usuario);
        public bool Save();
    }
}
