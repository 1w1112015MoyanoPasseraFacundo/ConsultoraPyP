using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosCompetencias
{
    public class CompetenciaGetDto
    {
        public int IdCompetencia { get; set; }
        [Required(ErrorMessage = "El campo Nombre es obligatorio")]
        public string Nombre { get; set; }
        [Required(ErrorMessage = "El campo Rubro es obligatorio")]
        public int idRubro { get; set; }

        public string? nombreRubro { get; set; }
    }
}
