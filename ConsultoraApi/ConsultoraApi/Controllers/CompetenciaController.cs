using AutoMapper;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Competencias")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class CompetenciaController : ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        IMapper _mapper;
        private readonly ICompetenciaRepositorio _uRepo;

        public CompetenciaController(ConsultoraPypContext _db, IMapper mapper, ICompetenciaRepositorio uRepo)
        {
            db = _db;
            _mapper = mapper;
            _uRepo = uRepo;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var compe = db.Competencias.ToList();
            if (compe == null || compe.Count == 0)
            {
                return StatusCode(400, "No existe ningúna competencia registrada");
            }
            List<CompetenciaUpdateDto> compeGetDto = new List<CompetenciaUpdateDto>();
            for (int i = 0; i < compe.Count; i++)
            {
                if (compe[i].FinVigencia == null)
                {
                    compeGetDto.Add(_mapper.Map<CompetenciaUpdateDto>(compe[i]));
                }
            }

            return Ok(compeGetDto);
        }

        [HttpPost]
        public IActionResult CreateCompetencia(CompetenciaCreateDto competenciaDto)
        {
            if (competenciaDto == null)
            {
                BadRequest();
            }
            var compe = _mapper.Map<Competencia>(competenciaDto);
            if (db.Competencias.Any(x => x.Nombre == compe.Nombre))
            {
                return StatusCode(409, "Ya existe un competencia con ese nombre");
            }
            compe.InicioVigencia = DateTime.Now;

            if (!_uRepo.CreateCompetencia(compe))
            {
                return StatusCode(500, $"Algo salió mal creando la competencia {compe.Nombre}");
            }

            return Ok($"Competencia {compe.Nombre} creada con exito");
        }

        [HttpPut("{idCompetencia:int}", Name = "UpdateCompetencia")]
        public IActionResult UpdateCompetencia(int idCompetencia, [FromBody] CompetenciaUpdateDto competenciaUpdateDto)
        {
            if (competenciaUpdateDto == null || idCompetencia != competenciaUpdateDto.IdCompetencia)
            {
                BadRequest();
            }
            var compe = _uRepo.GetCompetencia(idCompetencia);


            if (compe == null)
            {
                return StatusCode(400, "El Competencia no existe");
            }

            if (db.Competencias.Any(u => u.Nombre == competenciaUpdateDto.Nombre && u.IdCompetencia != idCompetencia))
            {
                return StatusCode(409, "El nombre de Competencia ya existe");
            }

            compe.Nombre = competenciaUpdateDto.Nombre;
            compe.IdRubro = competenciaUpdateDto.IdRubro;




            if (!_uRepo.UpdateCompetencia(compe))
            {
                return StatusCode(500, $"Algo salió mal actualizando la competencia {compe.Nombre}");
            }

            return Ok($"Competencia {compe.Nombre} modificada con exito");
        }


        [HttpDelete("{idCompetencia:int}", Name = "BajaCompetencia")]
        public IActionResult DeleteCompetencia(int idCompetencia)
        {
            if (idCompetencia == null)
            {
                BadRequest();
            }
            var compe = _uRepo.GetCompetencia(idCompetencia);


            if (compe == null)
            {
                return StatusCode(400, "La competencia no existe");
            }

            compe.FinVigencia = DateTime.Now;

            if (!_uRepo.DarDeBajaCompetencia(compe))
            {
                return StatusCode(500, $"Algo salió mal dando de baja el Competencia {compe.Nombre}");
            }

            return Ok($"Competencia {compe.Nombre} dada de baja con exito");
        }
    }
}
