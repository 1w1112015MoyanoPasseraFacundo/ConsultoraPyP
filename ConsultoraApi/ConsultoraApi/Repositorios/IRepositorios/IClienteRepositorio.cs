using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IClienteRepositorio
    {
        public bool Save();
        public bool CreateCliente(Cliente cliente);
        public bool UpdateCliente(Cliente cliente);
        public Cliente GetCliente(int idCliente);
        public bool DarDeBajaCliente(Cliente cliente);
    }
}
