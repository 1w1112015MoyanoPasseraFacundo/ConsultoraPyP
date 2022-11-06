using ConsultoraApi.Dtos.DtosCandXCompes;
using ConsultoraApi.Models;

namespace ConsultoraApi.Repositorios.IRepositorios
{
    public interface ICandidatoXCompetenciaRepositorio
    {

        public bool CreateCandXCompe(CandidatosXcompetencia candXCompe);
        public bool UpdateCandXCompe(CandidatosXcompetencia candXCompe);
        public List<CandidatosXcompetencia> GetCandXCompes(int idCandidato);
        public List<CandidatosXcompetencia> GetsCandsByIdCompes(List<int> idCompetencia);
        public List<CandidatosXcompetencia> GetCandsByIdCompes(int idCompetencia);
        public List<CandXCompeDto> GetCandByIdCompes(List<int> idsCompes);
        public bool DeleteCandXCompe(CandidatosXcompetencia candXCompe);
        public bool Save();
    }
}
