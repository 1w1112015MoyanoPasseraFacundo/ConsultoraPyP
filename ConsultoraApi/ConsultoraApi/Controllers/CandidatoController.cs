using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Helpers;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Numerics;

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
        private readonly ICandidatoXCompetenciaRepositorio _CXCRepo;
        private readonly EmailUtilities _emailUtilities;


        public CandidatoController(ConsultoraPypContext _db, IMapper mapper, ICandidatoRepositorio uRepo, ICandidatoXCompetenciaRepositorio CXCRepo, EmailUtilities emailUtilities)
        {
            db = _db;
            _mapper = mapper;
            _uRepo = uRepo;
            _CXCRepo = CXCRepo;
            _emailUtilities = emailUtilities;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var cand = db.Candidatos.ToList();
            if (cand == null || cand.Count == 0)
            {
                return StatusCode(400, "No existe ningún candidato registrado");
            }
            var candidatoGetDto = new List<CandidatoGetDto>();
            for (int i = 0; i < cand.Count; i++)
            {

                if (cand[i].Estado != "Descartado")
                {
                    candidatoGetDto.Add(_mapper.Map<CandidatoGetDto>(cand[i]));
                }
            }
            for (int i = 0; i < candidatoGetDto.Count; i++)
            {
                List<int> candXCompe = db.CandidatosXcompetencias.Where(x => x.IdCandidato == candidatoGetDto[i].IdCandidato).Select(x => x.IdCompetencia).ToList();
                List<CompetenciaListGetDto> compe = new List<CompetenciaListGetDto>();
                for (int j = 0; j < candXCompe.Count; j++)
                {
                    var compes = db.Competencias.Where(x => x.IdCompetencia == candXCompe[j]).FirstOrDefault();
                    compe.Add(_mapper.Map<CompetenciaListGetDto>(compes));
                }
                var pais = db.Paises.Where(x => x.IdPais == candidatoGetDto[i].IdPais).FirstOrDefault();
                candidatoGetDto[i].nombrePais = pais.Nombre;
                candidatoGetDto[i].lstCompes = compe;
            }

            return Ok(candidatoGetDto);
        }

        [HttpGet("{idCandidato:int}", Name = "GetCandidato")]
        public IActionResult GetCandidato(int idCandidato)
        {
            var cand = _uRepo.GetCandidato(idCandidato);
            if (cand == null)
            {
                return StatusCode(400, "No existe ningún candidato registrado");
            }
            var candidatoGetDto = new List<CandidatoGetDto>();

            if (cand.Estado != "Descartado")
            {
                candidatoGetDto.Add(_mapper.Map<CandidatoGetDto>(cand));
            }

            for (int i = 0; i < candidatoGetDto.Count; i++)
            {
                List<int> candXCompe = db.CandidatosXcompetencias.Where(x => x.IdCandidato == candidatoGetDto[i].IdCandidato).Select(x => x.IdCompetencia).ToList();
                List<CompetenciaListGetDto> compe = new List<CompetenciaListGetDto>();
                for (int j = 0; j < candXCompe.Count; j++)
                {
                    var compes = db.Competencias.Where(x => x.IdCompetencia == candXCompe[j]).FirstOrDefault();
                    compe.Add(_mapper.Map<CompetenciaListGetDto>(compes));
                }
                var pais = db.Paises.Where(x => x.IdPais == candidatoGetDto[i].IdPais).FirstOrDefault();
                candidatoGetDto[i].nombrePais = pais.Nombre;
                candidatoGetDto[i].lstCompes = compe;
            }

            return Ok(candidatoGetDto);
        }

        [HttpGet("GetCandidatosFilter")]
        public IActionResult GetCandidatosFilter([FromQuery] CandidatoFilterDto filterDto)
        {
            var listaCandidatos = _uRepo.GetFilterCandidato(filterDto);

            if (listaCandidatos.Count == 0)
            {
                return StatusCode(409, "No hay candidatos con esos filtros");
            }

            return Ok(listaCandidatos);
        }

        [HttpGet("GetCandidatosByCompes")]
        public IActionResult GetCandidatosByCompes([FromQuery] string idsCompes)
        {
            List<string> idsCompe = new List<string>();
            if (idsCompes != null)
            {
                idsCompe = idsCompes.Split(",").ToList();
            }
            else
            {
                return StatusCode(400, "Error");
            }
            var listaCandidatos = new List<CandidatoUpdateDto>();
            var cand = db.Candidatos.Where(x=>x.Estado!="Descartado").ToList();
            foreach (var item in cand)
            {
                bool esValido = true;
                foreach (var compes in idsCompe)
                {
                    esValido = _CXCRepo.CandXCompeExists(item.IdCandidato, int.Parse(compes));
                    if (!esValido)
                    {
                        break;
                    }
                }
                if (esValido)
                {
                    listaCandidatos.Add(_mapper.Map<CandidatoUpdateDto>(item));
                }
            }

            return Ok(listaCandidatos);
        }


        [HttpPost]
        public IActionResult CreateCandidato(CandidatoCreateDto candidatoDto)
        {
            if (candidatoDto == null)
            {
                BadRequest();
            }
            var cand = _mapper.Map<Candidato>(candidatoDto);
            if (_uRepo.MailExists(candidatoDto.Mail))
            {
                return StatusCode(409, "Ya existe un candidato registrado con ese e-mail");
            }
            if (_uRepo.CandidatoExists(candidatoDto.Documento))
            {
                return StatusCode(409, "Ya existe un candidato registrado con ese documento");
            }
            cand.IdEstado = 1;
            cand.Estado = "Postulado";

            if (!_uRepo.CreateCandidato(cand))
            {
                return StatusCode(500, $"Algo salió mal creando el candidato {cand.Nombre} {cand.Apellido}");
            }
            foreach (var compe in candidatoDto.lstCompes)
            {
                CandidatosXcompetencia candxCompe = new();
                candxCompe.IdCandidato = cand.IdCandidato;
                candxCompe.IdCompetencia = compe;

                if (!_CXCRepo.CreateCandXCompe(candxCompe))
                {
                    return StatusCode(500, $"Algo salió mal creando el candidatoXCompetencia {compe}/{cand.IdCandidato}");
                }
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

            if (_uRepo.MailExists(candidatoUpdateDto.IdCandidato, candidatoUpdateDto.Mail))
            {
                return StatusCode(409, "Ya existe un usuario registrado con ese e-mail");
            }
            if (_uRepo.CandidatoExists(candidatoUpdateDto.IdCandidato, candidatoUpdateDto.Documento))
            {
                return StatusCode(409, "Ya existe un usuario registrado con ese documento");
            }

            candidato.Nombre = candidatoUpdateDto.Nombre;
            candidato.Apellido = candidatoUpdateDto.Apellido;
            candidato.IdTipoDocumento = candidatoUpdateDto.IdTipoDocumento;
            candidato.Documento = candidatoUpdateDto.Documento;
            candidato.Telefono = candidatoUpdateDto.Telefono;
            candidato.FechaNacimiento = candidatoUpdateDto.FechaNacimiento;
            candidato.Mail = candidatoUpdateDto.Mail;
            candidato.IdGenero = candidatoUpdateDto.IdGenero;
            candidato.IdPais = candidatoUpdateDto.IdPais;
            candidato.IdRubro = candidatoUpdateDto.IdRubro;
            candidato.Linkedin = candidatoUpdateDto.Linkedin;
            candidato.Observaciones = candidatoUpdateDto.Observaciones;
            candidato.Estado = candidatoUpdateDto.Estado;
            candidato.EstadoCivil = candidatoUpdateDto.EstadoCivil;



            if (!_uRepo.UpdateCandidato(candidato))
            {
                return StatusCode(500, $"Algo salió mal actualizando el candidato {candidato.Nombre} {candidato.Apellido}");
            }
            List<CandidatosXcompetencia> candXComp = _CXCRepo.GetCandXCompes(idCandidato);
            foreach (CandidatosXcompetencia xcompetencia in candXComp)
                if (!_CXCRepo.DeleteCandXCompe(xcompetencia))
                {
                    return StatusCode(500, $"Algo salió mal actulizando el candidatoXCompetencia {xcompetencia.IdCandidato}/{candidato.IdCandidato}");
                }
            foreach (var compe in candidatoUpdateDto.lstCompes)
            {
                CandidatosXcompetencia candxCompe = new();
                candxCompe.IdCandidato = candidato.IdCandidato;
                candxCompe.IdCompetencia = compe;

                if (!_CXCRepo.UpdateCandXCompe(candxCompe))
                {
                    return StatusCode(500, $"Algo salió mal actulizando el candidatoXCompetencia {compe}/{candidato.IdCandidato}");
                }
            }

            return Ok($"Candidato {candidato.Nombre} {candidato.Apellido} modificado con exito");
        }

        [HttpPut("UpdateEstadoCandidato/{idCandidato:int}", Name = "UpdateEstadoCandidato")]
        public IActionResult UpdateEstadoCandidato(int idCandidato, [FromBody] CandidatoUpdateDto candidatoUpdateDto)
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

            candidato.Observaciones = candidatoUpdateDto.Observaciones;
            candidato.Estado = candidatoUpdateDto.Estado;



            if (!_uRepo.UpdateCandidato(candidato))
            {
                return StatusCode(500, $"Algo salió mal actualizando el candidato {candidato.Nombre} {candidato.Apellido}");
            }


            if (!_emailUtilities.SendChangeEstado(candidato.Mail, candidato))
            {
                ModelState.AddModelError("", $"Algo salió mal enviando mail al usuario {candidato.Nombre} {candidato.Apellido}");
                return StatusCode(500, ModelState);
            }


            return Ok($"Candidato {candidato.Nombre} {candidato.Apellido} modificado con exito");
        }


        [HttpDelete("{idCandidato:int}", Name = "BajaCandidato")]
        public IActionResult DeleteCandidato(int idCandidato)
        {
            if (idCandidato == null)
            {
                BadRequest();
            }
            var cand = _uRepo.GetCandidato(idCandidato);


            if (cand == null)
            {
                return StatusCode(400, "El candidato no existe");
            }

            cand.Estado = "Descartado";

            if (!_uRepo.DarDeBajaCandidato(cand))
            {
                return StatusCode(500, $"Algo salió mal dando de baja el candidato {cand.Nombre} {cand.Apellido}");
            }

            if (!_emailUtilities.SendDescartado(cand.Mail, cand))
            {
                ModelState.AddModelError("", $"Algo salió mal enviando mail al usuario {cand.Nombre} {cand.Apellido}");
                return StatusCode(500, ModelState);
            }
            //ELIMINAR CANDIDATOXCOMPETENCIA
            //List<CandidatosXcompetencia> candXComp = _CXCRepo.GetCandXCompes(idCandidato);
            //foreach (CandidatosXcompetencia xcompetencia in candXComp)
            //    if (!_CXCRepo.DeleteCandXCompe(xcompetencia))
            //    {
            //        return StatusCode(500, $"Algo salió mal dando de baja el candidatoXCompetencia {xcompetencia.IdCandidato}/{cand.IdCandidato}");
            //    }
            return Ok($"Candidato {cand.Nombre} {cand.Apellido} dado de baja con exito");
        }
    }
}
