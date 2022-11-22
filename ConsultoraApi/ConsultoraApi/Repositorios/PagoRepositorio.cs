using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosPagos;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{
    public class PagoRepositorio : IPagoRepositorio
    {

        ConsultoraPypContext db;

        public PagoRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }

        public Pago GetPago(int idPago)
        {
            if (idPago != null)
            {
                return db.Pagos.FirstOrDefault(u => u.IdPago == idPago );
            }
            else
            {
                return null;
            }
        }
        public ICollection<Pago> GetFilterPago(PagoFilterDto filterDto)
        {
            var lstPagos = db.Pagos.ToList();

            
            if (filterDto.idCliente != null)
            {
                lstPagos = lstPagos.Where(n => n.IdCliente == filterDto.idCliente && n.Estado==true).ToList();
            }

            return lstPagos;
        }
        public bool UpdatePago(Pago pago)
        {
            db.Pagos.Update(pago);
            return Save();
        }

        public bool DarDeBajaPago(Pago pago)
        {
            db.Pagos.Update(pago);
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

        public bool CreatePago(Pago pago)
        {
            db.Pagos.Add(pago);
            return Save();
        }
    }

}
