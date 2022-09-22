using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            UsuariosXroles = new HashSet<UsuariosXrole>();
        }

        public int IdUsuario { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public int IdTipoDocumento { get; set; }
        public int Documento { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public int? Telefono { get; set; }
        public string Mail { get; set; } = null!;
        public string NombreUsuario { get; set; } = null!;
        public int Cuil { get; set; }
        public string? Direccion { get; set; }
        public int IdGenero { get; set; }
        public string Password { get; set; } = null!;
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaSalida { get; set; }

        public virtual Genero IdGeneroNavigation { get; set; } = null!;
        public virtual TiposDocumento IdTipoDocumentoNavigation { get; set; } = null!;
        public virtual ICollection<UsuariosXrole> UsuariosXroles { get; set; }
    }
}
