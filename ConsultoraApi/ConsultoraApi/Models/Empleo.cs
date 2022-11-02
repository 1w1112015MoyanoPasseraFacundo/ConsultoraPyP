using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Empleo
    {
        public Empleo()
        {
            EmpleosXcompetencia = new HashSet<EmpleosXcompetencia>();
            Pagos = new HashSet<Pago>();
        }

        public int IdEmpleo { get; set; }
        public string Nombre { get; set; } = null!;
        public int IdCliente { get; set; }
        public int IdRubro { get; set; }
        public string? Modalidad { get; set; }
        public DateTime FechaAlta { get; set; }
        public int IdEstado { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; } = null!;
        public virtual Estado IdEstadoNavigation { get; set; } = null!;
        public virtual Rubro IdRubroNavigation { get; set; } = null!;
        public virtual ICollection<EmpleosXcompetencia> EmpleosXcompetencia { get; set; }
        public virtual ICollection<Pago> Pagos { get; set; }

    }
}
