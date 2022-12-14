using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Genero
    {
        public Genero()
        {
            Candidatos = new HashSet<Candidato>();
            Clientes = new HashSet<Cliente>();
            Usuarios = new HashSet<Usuario>();
        }

        public int IdGenero { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<Candidato> Candidatos { get; set; }
        public virtual ICollection<Cliente> Clientes { get; set; }
        public virtual ICollection<Usuario> Usuarios { get; set; }
    }
}
