using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Competencia
    {
        public Competencia()
        {
            CandidatosXcompetencia = new HashSet<CandidatosXcompetencia>();
            EmpleosXcompetencia = new HashSet<EmpleosXcompetencia>();
        }

        public int IdCompetencia { get; set; }
        public string Nombre { get; set; } = null!;
        public DateTime InicioVigencia { get; set; }
        public DateTime? FinVigencia { get; set; }
        public int IdRubro { get; set; }

        public virtual Rubro IdRubroNavigation { get; set; } = null!;
        public virtual ICollection<CandidatosXcompetencia> CandidatosXcompetencia { get; set; }
        public virtual ICollection<EmpleosXcompetencia> EmpleosXcompetencia { get; set; }
    }
}
