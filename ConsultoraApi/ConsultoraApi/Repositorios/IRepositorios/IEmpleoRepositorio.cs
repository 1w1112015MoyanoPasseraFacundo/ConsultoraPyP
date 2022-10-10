using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IEmpleoRepositorio
    {
        public bool CreateEmpleo(Empleo empleo);
        public bool Save();
        public bool UpdateEmpleo(Empleo empleo);
        public Empleo GetEmpleo(int idEmpleo);
        public bool DarDeBajaEmpleo(Empleo empleo);
    }
}
