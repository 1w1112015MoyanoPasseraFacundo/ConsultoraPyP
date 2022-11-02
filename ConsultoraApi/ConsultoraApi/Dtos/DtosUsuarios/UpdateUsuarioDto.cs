using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosUsuarios
{
    public class UpdateUsuarioDto
    {
        public int IdUsuario { get; set; }
        [Required(ErrorMessage = "El campo Nombre es obligatorio")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "El campo Apellido es obligatorio")]
        public string Apellido { get; set; }

        [Required(ErrorMessage = "El campo Tipo Documento es obligatorio")]
        public int IdTipoDocumento { get; set; }

        [Required(ErrorMessage = "El campo Numero Documento es obligatorio")]
        public int Documento { get; set; }
        [Required(ErrorMessage = "El campo Fecha Nacimiento es obligatorio")]
        public DateTime FechaNacimiento { get; set; }
        public DateTime? FechaSalida { get; set; }

        public string Telefono { get; set; }

        [Required(ErrorMessage = "El campo Mail es obligatorio")]
        public string Mail { get; set; }

        [Required(ErrorMessage = "El campo Nombre es obligatorio")]
        public string? NombreUsuario { get; set; }
        [Required(ErrorMessage = "El campo Cuil es obligatorio")]
        public string Cuil { get; set; }

        public string? Direccion { get; set; }

        [Required(ErrorMessage = "El campo Genero es obligatorio")]
        public int IdGenero { get; set; }

    }
}
