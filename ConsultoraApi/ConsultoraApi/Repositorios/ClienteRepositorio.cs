
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
