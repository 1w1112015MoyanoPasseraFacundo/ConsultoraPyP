using ConsultoraApi.Dtos.DtosPagos;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IPagoRepositorio
    {
        public bool CreatePago(Pago pago);
        public bool Save();
        public bool UpdatePago(Pago pago);
        public ICollection<Pago> GetFilterPago(PagoFilterDto filterDto);
        public Pago GetPago(int idPago);
        public bool DarDeBajaPago(Pago pago);
    }
}
