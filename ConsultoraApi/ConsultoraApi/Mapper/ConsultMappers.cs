using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
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

        }
    }
}
