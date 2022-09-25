using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class TipoDocumentoRepositorio : ITipoDocumentoRepositorio
    {
        ConsultoraPypContext db;


        public TipoDocumentoRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }

        public TiposDocumento GetTipoDocumento(int idTipoDocumento)
        {
            if (idTipoDocumento != null)
            {
                return db.TiposDocumentos.FirstOrDefault(u => u.IdTipoDocumento == idTipoDocumento);
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

        public bool CreateTipoDocumento(TiposDocumento tipoDocumento)
        {
            db.TiposDocumentos.Add(tipoDocumento);
            return Save();
        }

        public bool UpdateTipoDocumento(TiposDocumento tipoDocumento)
        {
            db.TiposDocumentos.Update(tipoDocumento);
            return Save();
        }

    }
}
