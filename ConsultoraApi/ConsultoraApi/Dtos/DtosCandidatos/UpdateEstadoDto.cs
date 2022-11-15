using System.ComponentModel.DataAnnotations;

namespace ConsultoraApi.Dtos.DtosCandidatos
{
    public class UpdateEstadoDto
    {
        public int IdCandidato { get; set; }

        public string Estado { get; set; }
        public string? Observaciones { get; set; }
    }
}
