using ConsultoraApi.Dtos.DtosClientes;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IClienteRepositorio
    {
        public bool Save();
        public bool CreateCliente(Cliente cliente);

        public bool MailExists(string mail);
        public bool MailExists(int idCliente, string mail);
        public bool RazonExists(string razon);
        public bool RazonExists(int idCliente, string razon);
        public bool CuitExists(string cuit);
        public bool CuitExists(int idCliente, string cuit);
        public bool TelefonoExists(string telefono);
        public bool TelefonoExists(int idCliente, string telefono);
        public ICollection<Cliente> GetFilterCliente(ClienteFilterDto filterDto);
        public bool UpdateCliente(Cliente cliente);
        public Cliente GetCliente(int idCliente);
        public bool DarDeBajaCliente(Cliente cliente);
    }
}
