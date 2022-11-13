﻿using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosCompetencias;
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

                if (empleo[i].IdEstado == 1)
                {
                    empleoGetDto.Add(_mapper.Map<EmpleoGetDto>(empleo[i]));
                }
            }
            if (empleoGetDto == null)
            {
                return StatusCode(409, "No existe ningún empleo activo actualmente");
            }
            for (int i = 0; i < empleoGetDto.Count; i++)
            {
                List<int> empXCompe = db.EmpleosXcompetencias.Where(x => x.IdEmpleo == empleoGetDto[i].IdEmpleo).Select(x => x.IdCompetencia).ToList();

                List<CompetenciaListGetDto> compe = new List<CompetenciaListGetDto>();
                for (int j = 0; j < empXCompe.Count; j++)
                {
                    var compes = db.Competencias.Where(x => x.IdCompetencia == empXCompe[j]).FirstOrDefault();
                    compe.Add(_mapper.Map<CompetenciaListGetDto>(compes));
                }

                var estado = db.Estados.Where(x => x.IdEstado == empleoGetDto[i].idEstado).FirstOrDefault();
                var rubro = db.Rubros.Where(x => x.IdRubro == empleoGetDto[i].IdRubro).FirstOrDefault();
                var cliente = db.Clientes.Where(x => x.IdCliente == empleoGetDto[i].IdCliente).FirstOrDefault();
                empleoGetDto[i].nombreRubro = rubro.Nombre;
                empleoGetDto[i].nombreEstado = estado.Nombre;
                empleoGetDto[i].nombreCliente = cliente.Nombre;
                empleoGetDto[i].lstCompes = compe;


            }

            return Ok(empleoGetDto);

        }

        [HttpGet("GetAllEmpleos")]
        public IActionResult GetAllEmpleos()
        {
            var empleo = db.Empleos.ToList();
            if (empleo == null || empleo.Count == 0)
            {
                return StatusCode(400, "No existe ningún empleo registrado");
            }
            var empleoGetDto = new List<EmpleoGetDto>();
            for (int i = 0; i < empleo.Count; i++)
            {
                    empleoGetDto.Add(_mapper.Map<EmpleoGetDto>(empleo[i]));
            }
            if (empleoGetDto == null)
            {
                return StatusCode(409, "No existe ningún empleo activo actualmente");
            }
            for (int i = 0; i < empleoGetDto.Count; i++)
            {
                List<int> empXCompe = db.EmpleosXcompetencias.Where(x => x.IdEmpleo == empleoGetDto[i].IdEmpleo).Select(x => x.IdCompetencia).ToList();

                List<CompetenciaListGetDto> compe = new List<CompetenciaListGetDto>();
                for (int j = 0; j < empXCompe.Count; j++)
                {
                    var compes = db.Competencias.Where(x => x.IdCompetencia == empXCompe[j]).FirstOrDefault();
                    compe.Add(_mapper.Map<CompetenciaListGetDto>(compes));
                }

                var estado = db.Estados.Where(x => x.IdEstado == empleoGetDto[i].idEstado).FirstOrDefault();
                var rubro = db.Rubros.Where(x => x.IdRubro == empleoGetDto[i].IdRubro).FirstOrDefault();
                var cliente = db.Clientes.Where(x => x.IdCliente == empleoGetDto[i].IdCliente).FirstOrDefault();
                empleoGetDto[i].nombreRubro = rubro.Nombre;
                empleoGetDto[i].nombreEstado = estado.Nombre;
                empleoGetDto[i].nombreCliente = cliente.Nombre;
                empleoGetDto[i].lstCompes = compe;


            }

            return Ok(empleoGetDto);

        }

        [HttpGet("GetEmpleosFilter")]
        public IActionResult GetEmpleosFilter([FromQuery] EmpleoFilterDto filterDto)
        {
            var listaEmpleos = _eRepo.GetFilterEmpleo(filterDto);
            var listaEmpleosDto = new List<EmpleoGetDto>();

            if (listaEmpleos.Count == 0)
            {
                return StatusCode(409, "No hay competencias con esos filtros");
            }
            int i = 0; //contador que recorre los usuariosGetAllDto
            foreach (var item in listaEmpleos)
            {
                listaEmpleosDto.Add(_mapper.Map<EmpleoGetDto>(item));
                var rubro = db.Rubros.FirstOrDefault(x => x.IdRubro == item.IdRubro);
                var cliente = db.Clientes.FirstOrDefault(x => x.IdCliente == item.IdCliente);
                var estado = db.Estados.FirstOrDefault(x => x.IdEstado == item.IdEstado);
                listaEmpleosDto[i].nombreRubro = rubro.Nombre;
                listaEmpleosDto[i].nombreCliente = cliente.Nombre;
                listaEmpleosDto[i].nombreEstado = estado.Nombre;
                i++;
            }
            return Ok(listaEmpleosDto);
        }

        [HttpGet("GetEmpleosByIdCliente")]
        public IActionResult GetEmpleosByIdCliente(int idCliente)
        {
            var emple = _eRepo.GetEmpleoByIdCliente(idCliente).Where(x=>x.IdEstado==1).ToList();
            if (emple == null || emple.Count == 0)
            {
                //DEJAR EN 200 ASI DEVUELVE LISTA VACIA
                return StatusCode(200, emple);
            }
            var empleGetDto = new List<EmpleoGetDto>();

            foreach (var i in emple)
            {
                var clien = db.Clientes.FirstOrDefault(x => x.IdCliente == i.IdCliente);

                var dto = new EmpleoGetDto { IdEmpleo = i.IdEmpleo, IdCliente = i.IdCliente, Nombre = i.Nombre};
                empleGetDto.Add(dto);
            }
            if (empleGetDto.Count == 0 || empleGetDto == null)
            {
                return StatusCode(409, "No hay competencias habilitadas");
            }

            return Ok(empleGetDto);
        }

        [HttpPost]
        public IActionResult CreateEmpleo(EmpleoCreateDto empleoDto)
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

        [HttpPut("SuspenderEmpleo")]
        public IActionResult SuspenderEmpleo(int idEmpleo)
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

            empl.IdEstado = 2;

            if (!_eRepo.UpdateEmpleo(empl))
            {
                return StatusCode(500, $"Algo salió mal suspendiendo el empleo {empl.Nombre}");
            }
            return Ok($"Empleo {empl.Nombre} suspendido con exito");
        }
        [HttpPut("ReanudarEmpleo")]
        public IActionResult ReanudarEmpleo(int idEmpleo)
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

            empl.IdEstado = 1;

            if (!_eRepo.UpdateEmpleo(empl))
            {
                return StatusCode(500, $"Algo salió mal reanudando el empleo {empl.Nombre}");
            }
            return Ok($"Empleo {empl.Nombre} reanudado con exito");
        }
        [HttpPut("CancelarEmpleo")]
        public IActionResult CancelarEmpleo(int idEmpleo)
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

            if (!_eRepo.UpdateEmpleo(empl))
            {
                return StatusCode(500, $"Algo salió mal cancelando el empleo {empl.Nombre}");
            }
            return Ok($"Empleo {empl.Nombre} cancelado con exito");
        }

       
    }
}
