using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosPagos
{
    public class PagoGetDto
    {
        public int IdPago { get; set; }

        [Required(ErrorMessage = "El campo fecha es obligatorio")]

        public DateTime fechaPago { get; set; }


        [Required(ErrorMessage = "El campo estado es obligatorio")]
        public int montoPago { get; set; }





        [Required(ErrorMessage = "El campo Pais es obligatorio")]
        public int IdCliente { get; set; }
        public string nombreCliente { get; set; }

        public Boolean estado { get; set; }
    }
}
