using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosEmpleos
{
    public class EmpleoCreateDto
    {
        [Required(ErrorMessage = "El campo Nombre es obligatorio")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo fecha es obligatorio")]

        public DateTime FechaAlta { get; set; }

        [Required(ErrorMessage = "El campo estado es obligatorio")]
        public int idEstado { get; set; }



        [Required(ErrorMessage = "El campo Rubro es obligatorio")]
        public int IdRubro { get; set; }


        [Required(ErrorMessage = "El campo Pais es obligatorio")]
        public int IdCliente { get; set; }

        public string? Modalidad { get; set; }

        public List<int> lstCompes { get; set; }
    }
}
