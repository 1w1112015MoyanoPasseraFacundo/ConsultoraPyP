using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Role
    {
        public Role()
        {
            UsuariosXroles = new HashSet<UsuariosXrole>();
        }

        public int IdRol { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<UsuariosXrole> UsuariosXroles { get; set; }
    }
}
