using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosPagos
{
    public class PagoUpdateDto
    {
        public int IdPago { get; set; }
        [Required(ErrorMessage = "El campo fecha es obligatorio")]

        public DateTime fechaPago { get; set; }

        [Required(ErrorMessage = "El campo monto es obligatorio")]

        public int montoPago { get; set; }





        [Required(ErrorMessage = "El campo Pais es obligatorio")]
        public int IdCliente { get; set; }
        public int IdEmpleo { get; set; }
        
    }
}
