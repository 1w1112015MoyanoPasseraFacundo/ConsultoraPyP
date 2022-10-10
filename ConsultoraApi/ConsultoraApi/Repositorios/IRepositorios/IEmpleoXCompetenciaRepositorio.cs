using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface IEmpleoXCompetenciaRepositorio
    {
        public bool Save();
        public bool CreateEmpleoXCompe(EmpleosXcompetencia emplXCompe);
        public bool UpdateEmpleoXCompe(EmpleosXcompetencia emplXCompe);
        public List<EmpleosXcompetencia> GetEmpleosXCompes(int idEmpleo);
        public bool DeleteEmpleoXCompe(EmpleosXcompetencia emplXCompe);
    }
}
