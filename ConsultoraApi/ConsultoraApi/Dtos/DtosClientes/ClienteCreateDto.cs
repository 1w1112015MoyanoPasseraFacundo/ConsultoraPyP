using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosClientes
{
    public class ClienteCreateDto
    { 
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo nombre fantasía es obligatorio")]
        public string nombreFantasia { get; set; }

        public int? IdTipoDocumento { get; set; }

        [Required(ErrorMessage = "El campo Numero Documento es obligatorio")]
        public string Documento { get; set; }
        public DateTime? FechaAlta { get; set; }

        public string? Telefono { get; set; }

        [Required(ErrorMessage = "El campo Mail es obligatorio")]
        public string Mail { get; set; }

        public int? idEstado { get; set; }

        public int? IdGenero { get; set; }

        [Required(ErrorMessage = "El campo Rubro es obligatorio")]
        public int IdRubro { get; set; }

        [Required(ErrorMessage = "El campo Pais es obligatorio")]
        public int IdPais { get; set; }

        public string? Direccion { get; set; }
    }
}
