using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Estado
    {
        public Estado()
        {
            Candidatos = new HashSet<Candidato>();
            Clientes = new HashSet<Cliente>();
            Empleos = new HashSet<Empleo>();
        }

        public int IdEstado { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Candidato> Candidatos { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Empleo> Empleos { get; set; }
    }
}
