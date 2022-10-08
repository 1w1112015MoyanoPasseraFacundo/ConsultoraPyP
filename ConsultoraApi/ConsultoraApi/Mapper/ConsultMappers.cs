using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosClientes;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Models;

namespace ConsultoraApi.Mapper
{
    public class ConsultMappers : Profile
    {
        public ConsultMappers()
        {
            CreateMap<Usuario, UsuarioCreateDto>().ReverseMap();
            CreateMap<Usuario, UpdateUsuarioDto>().ReverseMap();
            CreateMap<Candidato, CandidatoUpdateDto>().ReverseMap();
            CreateMap<Candidato, CandidatoCreateDto>().ReverseMap();
            CreateMap<Competencia, CompetenciaCreateDto>().ReverseMap();
            CreateMap<Competencia, CompetenciaUpdateDto>().ReverseMap();
            CreateMap<Cliente, ClienteGetDto>().ReverseMap();
            CreateMap<Cliente, ClienteCreateDto>().ReverseMap();
            CreateMap<Cliente, ClienteUpdateDto>().ReverseMap();

        }
    }
}
