using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Rubro
    {
        public Rubro()
        {
            Candidatos = new HashSet<Candidato>();
            Clientes = new HashSet<Cliente>();
            Competencia = new HashSet<Competencia>();
            Empleos = new HashSet<Empleo>();
        }

        public int IdRubro { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Candidato> Candidatos { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Competencia> Competencia { get; set; }
        public virtual ICollection<Empleo> Empleos { get; set; }
    }
}
