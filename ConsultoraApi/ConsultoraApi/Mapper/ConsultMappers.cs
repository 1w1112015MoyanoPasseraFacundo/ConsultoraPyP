using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosCandXCompes;
using ConsultoraApi.Dtos.DtosClientes;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosEmpleos;
using ConsultoraApi.Dtos.DtosPagos;
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
            CreateMap<Candidato, CandidatoGetDto>().ReverseMap();
            CreateMap<Competencia, CompetenciaCreateDto>().ReverseMap();
            CreateMap<Competencia, CompetenciaUpdateDto>().ReverseMap();
            CreateMap<Competencia, CompetenciaGetDto>().ReverseMap();
            CreateMap<Competencia, CompetenciaListGetDto>().ReverseMap();
            CreateMap<Cliente, ClienteGetDto>().ReverseMap();
            CreateMap<Cliente, ClienteCreateDto>().ReverseMap();
            CreateMap<Cliente, ClienteUpdateDto>().ReverseMap();
            CreateMap<Empleo, EmpleoGetDto>().ReverseMap();
            CreateMap<Empleo, EmpleoCreateDto>().ReverseMap();
            CreateMap<Pago, PagoGetDto>().ReverseMap();
            CreateMap<Pago, PagoCreateDto>().ReverseMap();
            CreateMap<CandidatosXcompetencia, CandXCompeDto>().ReverseMap();

        }
    }
}
