using ConsultoraApi.Models;
using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosCandidatos
{
    public class CandidatoCreateDto
    {
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

        public string Telefono { get; set; }

        [Required(ErrorMessage = "El campo Mail es obligatorio")]
        public string Mail { get; set; }

        public string? Seniority { get; set; }
        public int? EstadoCivil { get; set; }

        public string? Linkedin { get; set; }

        [Required(ErrorMessage = "El campo Genero es obligatorio")]
        public int IdGenero { get; set; }
        [Required(ErrorMessage = "El campo Pais es obligatorio")]
        public int IdPais { get; set; }
        [Required(ErrorMessage = "El campo Rubro es obligatorio")]
        public int IdRubro { get; set; }

        public List<int> lstCompes { get; set; }
    }
}
