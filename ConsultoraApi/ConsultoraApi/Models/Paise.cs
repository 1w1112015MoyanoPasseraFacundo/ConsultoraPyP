using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Paise
    {
        public Paise()
        {
            Candidatos = new HashSet<Candidato>();
            Clientes = new HashSet<Cliente>();
        }

        public int IdPais { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Candidato> Candidatos { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
    }
}
