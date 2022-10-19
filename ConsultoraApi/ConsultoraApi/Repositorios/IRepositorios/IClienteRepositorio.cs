using ConsultoraApi.Dtos.DtosClientes;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IClienteRepositorio
    {
        public bool Save();
        public bool CreateCliente(Cliente cliente);
        public ICollection<Cliente> GetFilterCliente(ClienteFilterDto filterDto);
        public bool UpdateCliente(Cliente cliente);
        public Cliente GetCliente(int idCliente);
        public bool DarDeBajaCliente(Cliente cliente);
    }
}
