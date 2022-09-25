using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosUsuarios
{
    public class UsuarioCreateDto
    {
        [Required(ErrorMessage = "El campo Nombre es obligatorio")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo Apellido es obligatorio")]
        public string Apellido { get; set; }

        [Required(ErrorMessage = "El campo Tipo Documento es obligatorio")]
        public int IdTipoDocumento { get; set; }

        [Required(ErrorMessage = "El campo Numero Documento es obligatorio")]
        public string Documento { get; set; }
        [Required(ErrorMessage = "El campo Fecha Nacimiento es obligatorio")]
        public DateTime FechaNacimiento { get; set; }

        public Int64? Telefono { get; set; }

        [Required(ErrorMessage = "El campo Mail es obligatorio")]
        public string Mail { get; set; }

        [Required(ErrorMessage = "El campo Nombre es obligatorio")]
        public string? NombreUsuario { get; set; }
        [Required(ErrorMessage = "El campo Cuil es obligatorio")]
        public string Cuil { get; set; }

        public string? Direccion { get; set; }

        [Required(ErrorMessage = "El campo Genero es obligatorio")]
        public int IdGenero { get; set; }


        [Required(ErrorMessage = "El campo password es obligatorio")]
        public string? Password { get; set; }

        [Required(ErrorMessage = "El campo Fecha Entrada es obligatorio")]
        public DateTime FechaAlta { get; set; }

    }
}
