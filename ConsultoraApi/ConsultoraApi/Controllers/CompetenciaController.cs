using AutoMapper;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel;

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
        private readonly IEmpleoXCompetenciaRepositorio _EXCRepo;

        public CompetenciaController(ConsultoraPypContext _db, IMapper mapper, ICompetenciaRepositorio uRepo, IEmpleoXCompetenciaRepositorio eXCRepo)
        {
            db = _db;
            _mapper = mapper;
            _uRepo = uRepo;
            _EXCRepo = eXCRepo; 
        }
        [HttpGet]
        public IActionResult Get()
        {
            var compe = db.Competencias.ToList();
            if (compe == null || compe.Count == 0)
            {
                return StatusCode(400, "No existe ningúna competencia registrada");
            }
            var compeGetDto = new List<CompetenciaGetDto>();

            foreach (var i in compe)
            {
                var rubro = db.Rubros.FirstOrDefault(x => x.IdRubro == i.IdRubro);

                var dto = new CompetenciaGetDto { idRubro = i.IdRubro, IdCompetencia = i.IdCompetencia, Nombre = i.Nombre, nombreRubro = rubro.Nombre };
                compeGetDto.Add(dto);
            }
            if (compeGetDto.Count == 0 || compeGetDto == null)
            {
                return StatusCode(409, "No hay competencias habilitadas");
            }

            return Ok(compeGetDto);
        }
        [HttpGet("GetCompetenciasByIdRubro")]
        public IActionResult GetCompetenciaByIdRubro(int idRubro)
        {
            var compe = _uRepo.GetCompetenciaByIdRubro(idRubro);
            if (compe == null || compe.Count == 0)
            {
                //DEJAR EN 200 ASI DEVUELVE LISTA VACIA
                return StatusCode(200, compe);
            }
            var compeGetDto = new List<CompetenciaGetDto>();

            foreach (var i in compe)
            {
                var rubro = db.Rubros.FirstOrDefault(x => x.IdRubro == i.IdRubro);

                var dto = new CompetenciaGetDto { idRubro = i.IdRubro, IdCompetencia = i.IdCompetencia, Nombre = i.Nombre, nombreRubro = rubro.Nombre };
                compeGetDto.Add(dto);
            }
            if (compeGetDto.Count == 0 || compeGetDto == null)
            {
                return StatusCode(409, "No hay competencias habilitadas");
            }

            return Ok(compeGetDto);
        }

        [HttpGet("GetCompetenciasByIdEmpleo")]
        public IActionResult GetCompetenciasByIdEmpleo(int idEmpleo)
        {
            var compes = _EXCRepo.GetEmpleosXCompes(idEmpleo);
            if (compes == null || compes.Count == 0)
            {
                //DEJAR EN 200 ASI DEVUELVE LISTA VACIA
                return StatusCode(200, compes);
            }
            var compeGetDto = new List<CompetenciaListGetDto>();

            foreach (var i in compes)
            {
                var compe = db.Competencias.FirstOrDefault(x => x.IdCompetencia == i.IdCompetencia);

                var dto = new CompetenciaListGetDto {IdCompetencia = i.IdCompetencia, Nombre = compe.Nombre };
                compeGetDto.Add(dto);
            }
            if (compeGetDto.Count == 0 || compeGetDto == null)
            {
                return StatusCode(409, "No hay competencias habilitadas");
            }

            return Ok(compeGetDto);
        }

        [HttpGet("GetCompetenciasFilter")]
        public IActionResult GetCompetenciasFilter([FromQuery] CompetenciaFilterDto filterDto)
        {
            var listaCompetencias = _uRepo.GetFilterCompetencia(filterDto);
            var listaCompetenciasDto = new List<CompetenciaGetDto>();

            if (listaCompetencias.Count == 0)
            {
                return StatusCode(409, "No hay competencias con esos filtros");
            }
            int i = 0; //contador que recorre los usuariosGetAllDto
            foreach (var item in listaCompetencias)
            {

                listaCompetenciasDto.Add(_mapper.Map<CompetenciaGetDto>(item));
                var rubro = db.Rubros.FirstOrDefault(x => x.IdRubro == item.IdRubro);
                listaCompetenciasDto[i].nombreRubro = rubro.Nombre;
                i++;
            }
            return Ok(listaCompetenciasDto);
        }

        [HttpPost]
        public IActionResult CreateCompetencia(CompetenciaCreateDto competenciaDto)
        {
            if (competenciaDto == null)
            {
                BadRequest();
            }
            var compe = _mapper.Map<Competencia>(competenciaDto);
            if (_uRepo.CompetenciaExists(competenciaDto.Nombre, competenciaDto.IdRubro))
            {
                return StatusCode(409, "Ya existe una habilidad idéntica");
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

            if (_uRepo.CompetenciaExists(competenciaUpdateDto.IdCompetencia,competenciaUpdateDto.Nombre) && _uRepo.CompetenciaExists(competenciaUpdateDto.IdCompetencia, competenciaUpdateDto.IdRubro))
            {
                return StatusCode(409, "Ya existe una habilidad idéntica");
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
