
using ConsultoraApi.Dtos.DtosClientes;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;

namespace ConsultoraApi.Repositorios
{

    public class ClienteRepositorio : IClienteRepositorio
    {

        ConsultoraPypContext db;

        public ClienteRepositorio(ConsultoraPypContext _db)
        {
            db = _db;
        }

        public Cliente GetCliente(int idCliente)
        {
            if (idCliente != null)
            {
                return db.Clientes.FirstOrDefault(u => u.IdCliente == idCliente);
            }
            else
            {
                return null;
            }
        }
        public ICollection<Cliente> GetFilterCliente(ClienteFilterDto filterDto)
        {
            var lstUsuarios = db.Clientes.ToList();
            if (filterDto.estado != null)
            {
                if (filterDto.estado == "SI")
                {
                    lstUsuarios = lstUsuarios.Where(u => u.IdEstado != 3).ToList();
                }
                if (filterDto.estado == "NO")
                {
                    lstUsuarios = lstUsuarios.Where(u => u.IdEstado == 3).ToList();
                }
            }
            if (filterDto.nombre != null)
            {
                lstUsuarios = lstUsuarios.Where(c => c.Nombre.ToLower().Contains(filterDto.nombre.ToLower())).ToList();
            }
            if (filterDto.mail != null)
            {
                lstUsuarios = lstUsuarios.Where(n => n.Mail.Contains(filterDto.mail)).ToList();
            }

            return lstUsuarios;
        }

        public bool MailExists(string mail)
        {
            return db.Clientes.Any(u => u.Mail.ToLower() == mail.ToLower());
        }
        public bool MailExists(int idCliente, string mail)
        {
            return db.Clientes.Any(u => u.IdCliente != idCliente && u.Mail.ToLower() == mail.ToLower());
        }  
        public bool RazonExists(string razon)
        {
            return db.Clientes.Any(u => u.RazonSocial.ToLower() == razon.ToLower());
        }
        public bool RazonExists(int idCliente, string razon)
        {
            return db.Clientes.Any(u => u.IdCliente != idCliente && u.RazonSocial.ToLower() == razon.ToLower());
        }
        public bool CuitExists(string cuit)
        {
            return db.Clientes.Any(u => u.Documento == cuit);
        }
        public bool CuitExists(int idCliente, string cuit)
        {
            return db.Clientes.Any(u => u.IdCliente != idCliente && u.Documento == cuit);
        }
        public bool TelefonoExists(string telefono)
        {
            return db.Clientes.Any(u => u.Telefono == telefono);
        }
        public bool TelefonoExists(int idCliente, string telefono)
        {
            return db.Clientes.Any(u => u.IdCliente != idCliente && u.Telefono == telefono);
        }

        public bool UpdateCliente(Cliente cliente)
        {
            db.Clientes.Update(cliente);
            return Save();
        }

        public bool DarDeBajaCliente(Cliente cliente)
        {
            db.Clientes.Update(cliente);
            return Save();
        }
        public bool Save()
        {
            try
            {
                return db.SaveChanges() > 0 ? true : false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool CreateCliente(Cliente cliente)
        {
            db.Clientes.Add(cliente);
            return Save();
        }

    }
}
