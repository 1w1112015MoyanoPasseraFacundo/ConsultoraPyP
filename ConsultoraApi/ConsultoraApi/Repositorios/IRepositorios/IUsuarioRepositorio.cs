using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IUsuarioRepositorio
    {

        public Usuario GetUsuario(int idUsuario);
        public Usuario GetUsuario(string mail);
        public ICollection<Usuario> GetListUsuario(int idUsuario);
        public ICollection<Usuario> GetFilterUsuario(UsuarioFilterDto filterDto);
        public bool CreateUsuario(Usuario usuario);
        public bool UsuarioExists(string NombreUsuario);
        public bool IsValid(string emailaddress);
        public bool NumeroDocumentoExists(int idUsuario, int NumeroDocumento);
        public bool UsuarioExists(int idUsuario, string NombreUsuario);

        public int validarEdad(DateTime fechaNac);
        public bool NumeroDocumentoExists(int NumeroDocumento);
        public bool MailExists(string mail);
        public bool MailExists(int idUsuario, string mail);

        public bool UpdateUsuario(Usuario usuario);
        public bool DarDeBajaUsuario(Usuario usuario);
        public bool Save();
    }
}
