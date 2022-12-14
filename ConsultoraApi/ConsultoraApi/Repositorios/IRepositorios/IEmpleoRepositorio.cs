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
        public ICollection<ReporteDto> GetEmpleosPorMes(int mes);
        public ICollection<ReporteDto> GetEmpleosSinMes();
        public ICollection<ReporteDto> GetEmpleosPoFecha(DateTime fecha1, DateTime fecha2);
        public ICollection<EmpleoReporte2Dto> GetEstadoEmpleosPoFecha(DateTime fecha1, DateTime fecha2);
        public ICollection<EmpleoReporte2Dto> GetEstadoEmpleos();
        public List<Empleo> GetEmpleoPorMes(int mes);
        public Empleo GetEmpleo(int idEmpleo);
        public Estado GetEstado(string nombreEstado);
        public ICollection<Empleo> GetFilterEmpleo(EmpleoFilterDto filterDto);
        public bool DarDeBajaEmpleo(Empleo empleo);
    }
}
