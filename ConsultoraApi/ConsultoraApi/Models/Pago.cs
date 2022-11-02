using System;
using System.Collections.Generic;

namespace ConsultoraApi.Models
{
    public partial class Pago
    {
        public int IdPago { get; set; }
        public int MontoPago { get; set; }
        public DateTime FechaPago { get; set; }
        public bool Estado { get; set; }
        public int IdCliente { get; set; }
        public int IdEmpleo { get; set; }

        public virtual Cliente IdClienteNavigation { get; set; } = null!;
        public virtual Empleo IdEmpleoNavigation { get; set; } = null!;
    }
}
