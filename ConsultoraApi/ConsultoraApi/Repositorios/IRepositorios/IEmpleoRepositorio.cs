using ConsultoraApi.Dtos.DtosEmpleos;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IEmpleoRepositorio
    {
        public bool CreateEmpleo(Empleo empleo);
        public bool Save();
        public bool UpdateEmpleo(Empleo empleo);
        public ICollection<Empleo> GetEmpleoByIdCliente(int idCliente);
        public Empleo GetEmpleo(int idEmpleo);
        public ICollection<Empleo> GetFilterEmpleo(EmpleoFilterDto filterDto);
        public bool DarDeBajaEmpleo(Empleo empleo);
    }
}
