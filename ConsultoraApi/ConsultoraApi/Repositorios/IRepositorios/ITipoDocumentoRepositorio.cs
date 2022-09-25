using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ITipoDocumentoRepositorio
    {
        public TiposDocumento GetTipoDocumento(int idTipoDocumento);
        public bool CreateTipoDocumento(TiposDocumento tipoDocumento);

        public bool UpdateTipoDocumento(TiposDocumento tipoDocumento);

        
        public bool Save();
    }
}
