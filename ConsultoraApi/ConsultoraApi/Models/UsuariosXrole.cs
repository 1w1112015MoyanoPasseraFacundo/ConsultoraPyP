using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class UsuariosXrole
    {
        public int IdUsuarioXrol { get; set; }
        public int IdUsuario { get; set; }
        public int IdRol { get; set; }

        public virtual Role IdRolNavigation { get; set; } = null!;
        public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
    }
}
