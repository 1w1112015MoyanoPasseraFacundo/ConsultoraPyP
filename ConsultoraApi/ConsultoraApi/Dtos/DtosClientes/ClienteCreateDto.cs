using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosClientes
{
    public class ClienteCreateDto
    { public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo nombre fantasía es obligatorio")]
        public string nombreFantasia { get; set; }

        //[Required(ErrorMessage = "El campo Tipo Documento es obligatorio")]
        public int IdTipoDocumento { get; set; }

        [Required(ErrorMessage = "El campo Numero Documento es obligatorio")]
        public int Documento { get; set; }
        //[Required(ErrorMessage = "El campo Fecha Nacimiento es obligatorio")]
        public DateTime FechaAlta { get; set; }

        public string? Telefono { get; set; }

        [Required(ErrorMessage = "El campo Mail es obligatorio")]
        public string Mail { get; set; }


        //[Required(ErrorMessage = "El campo estado es obligatorio")]
        public int idEstado { get; set; }

        //[Required(ErrorMessage = "El campo Genero es obligatorio")]
        public int IdGenero { get; set; }

        [Required(ErrorMessage = "El campo Rubro es obligatorio")]
        public int IdRubro { get; set; }

        [Required(ErrorMessage = "El campo Pais es obligatorio")]
        public int IdPais { get; set; }

        public string? Direccion { get; set; }
    }
}
