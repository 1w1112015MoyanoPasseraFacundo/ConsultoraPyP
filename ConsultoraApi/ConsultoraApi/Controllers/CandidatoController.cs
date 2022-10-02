using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers

{
    [Route("api/Candidatos")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class CandidatoController : ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        IMapper _mapper;
        private readonly ICandidatoRepositorio _uRepo;

        public CandidatoController(ConsultoraPypContext _db, IMapper mapper, ICandidatoRepositorio uRepo)
        {
            db = _db;
            _mapper = mapper;
            _uRepo = uRepo;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var cand = db.Candidatos.ToList();
            if (cand == null || cand.Count == 0)
            {
                return StatusCode(400, "No existe ningún candidato registrado");
            }
            List<CandidatoUpdateDto> candidatoGetDto = new List<CandidatoUpdateDto>();
            for (int i = 0; i < cand.Count; i++)
            {
                if (cand[i].IdEstado != 3)
                {
                    candidatoGetDto.Add(_mapper.Map<CandidatoUpdateDto>(cand[i]));
                }
            }

            return Ok(candidatoGetDto);
        }

        [HttpPost]
        public IActionResult CreateCandidato(CandidatoCreateDto candidatoDto)
        {
            if (candidatoDto == null)
            {
                BadRequest();
            }
            var cand = _mapper.Map<Candidato>(candidatoDto);
            if (db.Candidatos.Any(x => x.Documento == cand.Documento))
            {
                return StatusCode(409, "Ya existe un candidato con ese documento");
            }
            cand.IdEstado = 1;

            if (!_uRepo.CreateCandidato(cand))
            {
                return StatusCode(500, $"Algo salió mal creando el candidato {cand.Nombre} {cand.Apellido}");
            }

            return Ok($"Candidato {cand.Nombre} {cand.Apellido} creado con exito");
        }

        [HttpPut("{idCandidato:int}", Name = "UpdateCandidato")]
        public IActionResult Updatecandidato(int idCandidato, [FromBody] CandidatoUpdateDto candidatoUpdateDto)
        {
            if (candidatoUpdateDto == null || idCandidato != candidatoUpdateDto.IdCandidato)
            {
                BadRequest();
            }
            var candidato = _uRepo.GetCandidato(idCandidato);


            if (candidato == null)
            {
                return StatusCode(400, "El candidato no existe");
            }

            if (db.Candidatos.Any(u => u.Documento == candidatoUpdateDto.Documento && u.IdCandidato != idCandidato))
            {
                return StatusCode(409, "El nombre de candidato ya existe");
            }

            candidato.Nombre = candidatoUpdateDto.Nombre;
            candidato.Apellido = candidatoUpdateDto.Apellido;
            candidato.IdTipoDocumento = candidatoUpdateDto.IdTipoDocumento;
            candidato.Documento = candidatoUpdateDto.Documento;
            candidato.Telefono = candidatoUpdateDto.Telefono;
            candidato.FechaNacimiento = candidatoUpdateDto.FechaNacimiento;
            candidato.Mail = candidatoUpdateDto.Mail;
            candidato.IdGenero = candidatoUpdateDto.IdGenero;


            if (!_uRepo.UpdateCandidato(candidato))
            {
                return StatusCode(500, $"Algo salió mal actualizando el candidato {candidato.Nombre} {candidato.Apellido}");
            }

            return Ok($"candidato {candidato.Nombre} {candidato.Apellido} modificado con exito");
        }
    }
}
