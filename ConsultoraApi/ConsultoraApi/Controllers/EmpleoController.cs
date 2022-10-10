using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosEmpleos;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Empleos")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class EmpleoController : ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        IMapper _mapper;
        private readonly IEmpleoRepositorio _eRepo;
        private readonly IEmpleoXCompetenciaRepositorio _EXCRepo;

        public EmpleoController(ConsultoraPypContext _db, IMapper mapper, IEmpleoRepositorio uRepo, IEmpleoXCompetenciaRepositorio CXCRepo)
        {
            db = _db;
            _mapper = mapper;
            _eRepo = uRepo;
            _EXCRepo = CXCRepo;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var empleo = db.Empleos.ToList();
            if (empleo == null || empleo.Count == 0)
            {
                return StatusCode(400, "No existe ningún empleo registrado");
            }
            var empleoGetDto = new List<EmpleoGetDto>();
            for (int i = 0; i < empleo.Count; i++)
            {

                if (empleo[i].IdEstado != 3)
                {

                    empleoGetDto.Add(_mapper.Map<EmpleoGetDto>(empleo[i]));
                }
                else
                {
                    return StatusCode(409, "No existe ningún empleo activo actualmente");
                }
            }
            for (int i = 0; i < empleoGetDto.Count; i++)
            {
                List<int> empXCompe = db.EmpleosXcompetencias.Where(x => x.IdEmpleo == empleoGetDto[i].IdEmpleo).Select(x => x.IdCompetencia).ToList();
                var rubro = db.Rubros.Where(x => x.IdRubro == empleoGetDto[i].IdRubro).FirstOrDefault();
                var cliente = db.Clientes.Where(x => x.IdCliente == empleoGetDto[i].IdCliente).FirstOrDefault();
                empleoGetDto[i].nombreRubro = rubro.Nombre;
                empleoGetDto[i].nombreCliente = cliente.Nombre;
                empleoGetDto[i].lstCompes = empXCompe;


            }

            return Ok(empleoGetDto);

        }

        [HttpPost]
        public IActionResult CreateCandidato(EmpleoCreateDto empleoDto)
        {
            if (empleoDto == null)
            {
                BadRequest();
            }
            var emple = _mapper.Map<Empleo>(empleoDto);

            emple.IdEstado = 1;
            emple.FechaAlta = DateTime.Now;

            if (!_eRepo.CreateEmpleo(emple))
            {
                return StatusCode(500, $"Algo salió mal creando el empleo {emple.Nombre} ");
            }
            foreach (var compe in empleoDto.lstCompes)
            {
                EmpleosXcompetencia empxCompe = new();
                empxCompe.IdEmpleo = emple.IdEmpleo;
                empxCompe.IdCompetencia = compe;

                if (!_EXCRepo.CreateEmpleoXCompe(empxCompe))
                {
                    return StatusCode(500, $"Algo salió mal creando el empleoXCompetencia {compe}/{emple.IdEmpleo}");
                }
            }
            return Ok($"Empleo {emple.Nombre}  creado con exito");
        }

        [HttpPut("{idEmpleo:int}", Name = "UpdateEmpleo")]
        public IActionResult UpdateEmpleo(int idEmpleo, [FromBody] EmpleoUpdateDto empleoUpdateDto)
        {
            if (empleoUpdateDto == null || idEmpleo != empleoUpdateDto.IdEmpleo)
            {
                BadRequest();
            }
            var empleo = _eRepo.GetEmpleo(idEmpleo);


            if (empleo == null)
            {
                return StatusCode(400, "El empleo no existe");
            }

            if (db.Empleos.Any(u => u.Nombre == empleoUpdateDto.Nombre && u.IdEmpleo != idEmpleo))
            {
                return StatusCode(409, "El nombre de empleo ya existe");
            }

            empleo.Nombre = empleoUpdateDto.Nombre;
            empleo.IdCliente = empleoUpdateDto.IdCliente;
            empleo.IdRubro = empleoUpdateDto.IdRubro;
            empleo.Modalidad = empleoUpdateDto.Modalidad;
            empleo.FechaAlta = empleo.FechaAlta;



            if (!_eRepo.UpdateEmpleo(empleo))
            {
                return StatusCode(500, $"Algo salió mal actualizando el empleo {empleo.Nombre} ");
            }
            List<EmpleosXcompetencia> empXComp = _EXCRepo.GetEmpleosXCompes(idEmpleo);
            foreach (EmpleosXcompetencia xcompetencia in empXComp)
                if (!_EXCRepo.DeleteEmpleoXCompe(xcompetencia))
                {
                    return StatusCode(500, $"Algo salió mal actulizando el empleoXCompetencia {xcompetencia.IdCompetencia}/{empleo.IdEmpleo}");
                }

            foreach (var compe in empleoUpdateDto.lstCompes)
            {
                EmpleosXcompetencia empxCompe = new();
                empxCompe.IdEmpleo = empleo.IdEmpleo;
                empxCompe.IdCompetencia = compe;

                if (!_EXCRepo.UpdateEmpleoXCompe(empxCompe))
                {
                    return StatusCode(500, $"Algo salió mal actulizando el empleoXCompetencia {compe}/{empleo.IdEmpleo}");
                }
            }

            return Ok($"Empleo {empleo.Nombre} modificado con exito");
        }

        [HttpDelete("{idEmpleo:int}", Name = "BajaEmpleo")]
        public IActionResult DeleteEmpleo(int idEmpleo)
        {
            if (idEmpleo == null)
            {
                BadRequest();
            }
            var empl = _eRepo.GetEmpleo(idEmpleo);


            if (empl == null)
            {
                return StatusCode(400, "El candidato no existe");
            }

            empl.IdEstado = 3;
            
            if (!_eRepo.DarDeBajaEmpleo(empl))
            {
                return StatusCode(500, $"Algo salió mal dando de baja el empleo {empl.Nombre}");
            }
            //ELIMINAR EMPLEOXCOMPETENCIA

            //List<EmpleosXcompetencia> empXComp = _EXCRepo.GetEmpleosXCompes(idEmpleo);
            //foreach (EmpleosXcompetencia xcompetencia in empXComp)
            //    if (!_EXCRepo.DeleteEmpleoXCompe(xcompetencia))
            //    {
            //        return StatusCode(500, $"Algo salió mal eliminando el empleoXCompetencia {xcompetencia.IdCompetencia}/{empl.IdEmpleo}");
            //    }

            return Ok($"Empleo {empl.Nombre} dado de baja con exito");
        }
    }
}
