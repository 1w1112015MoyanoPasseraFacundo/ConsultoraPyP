using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Empleos = new HashSet<Empleo>();
            Pagos = new HashSet<Pago>();
        }

        public int IdCliente { get; set; }
        public string Nombre { get; set; } = null!;
        public string NombreFantasia { get; set; } = null!;
        public int IdTipoDocumento { get; set; }
        public int Documento { get; set; }
        public DateTime FechaAlta { get; set; }
        public int? Telefono { get; set; }
        public string Mail { get; set; } = null!;
        public string? RazonSocial { get; set; }
        public int IdEstado { get; set; }
        public int IdGenero { get; set; }
        public int IdRubro { get; set; }
        public int IdPais { get; set; }
        public string? Direccion { get; set; }

        public virtual Estado IdEstadoNavigation { get; set; } = null!;
        public virtual Genero IdGeneroNavigation { get; set; } = null!;
        public virtual Paise IdPaisNavigation { get; set; } = null!;
        public virtual Rubro IdRubroNavigation { get; set; } = null!;
        public virtual TiposDocumento IdTipoDocumentoNavigation { get; set; } = null!;
        public virtual ICollection<Empleo> Empleos { get; set; }
        public virtual ICollection<Pago> Pagos { get; set; }
    }
}
