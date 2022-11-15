using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Candidato
    {
        public Candidato()
        {
            CandidatosXcompetencia = new HashSet<CandidatosXcompetencia>();
        }

        public int IdCandidato { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public int IdTipoDocumento { get; set; }
        public int Documento { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public string? Telefono { get; set; }
        public string Mail { get; set; } = null!;
        public string? Estado { get; set; }
        public string? Linkedin { get; set; }
        public int? EstadoCivil { get; set; }
        public int IdPais { get; set; }
        public int IdEstado { get; set; }
        public int IdRubro { get; set; }
        public int IdGenero { get; set; }
        public string? Observaciones { get; set; }


        public virtual Estado IdEstadoNavigation { get; set; } = null!;
        public virtual Genero IdGeneroNavigation { get; set; } = null!;
        public virtual Paise IdPaisNavigation { get; set; } = null!;
        public virtual Rubro IdRubroNavigation { get; set; } = null!;
        public virtual TiposDocumento IdTipoDocumentoNavigation { get; set; } = null!;
        public virtual ICollection<CandidatosXcompetencia> CandidatosXcompetencia { get; set; }
    }
}
