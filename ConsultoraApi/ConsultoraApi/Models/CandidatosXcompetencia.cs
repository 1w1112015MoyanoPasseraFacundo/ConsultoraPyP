using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class CandidatosXcompetencia
    {
        public int IdCandidatoXcompetencia { get; set; }
        public int IdCandidato { get; set; }
        public int IdCompetencia { get; set; }

        public virtual Candidato IdCandidatoNavigation { get; set; } = null!;
        public virtual Competencia IdCompetenciaNavigation { get; set; } = null!;
    }
}
