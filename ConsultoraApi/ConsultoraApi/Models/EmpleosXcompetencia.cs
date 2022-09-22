using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class EmpleosXcompetencia
    {
        public int IdEmpleoXcompetencia { get; set; }
        public int IdEmpleo { get; set; }
        public int IdCompetencia { get; set; }

        public virtual Competencia IdCompetenciaNavigation { get; set; } = null!;
        public virtual Empleo IdEmpleoNavigation { get; set; } = null!;
    }
}
