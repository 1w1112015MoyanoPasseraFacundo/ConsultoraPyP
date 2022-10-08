using AutoMapper;
using ConsultoraApi.Dtos.DtosCandidatos;
using ConsultoraApi.Dtos.DtosClientes;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Clientes")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class ClienteController : ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        IMapper _mapper;
        private readonly IClienteRepositorio _cRepo;

        public ClienteController(ConsultoraPypContext _db, IMapper mapper, IClienteRepositorio cRepo)
        {
            this.db = _db;
            _mapper = mapper ;
            _cRepo = cRepo;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var clien = db.Clientes.ToList();
            if (clien == null || clien.Count == 0)
            {
                return StatusCode(400, "No existe ningún cliente registrado");
            }
            var clienteGetDto = new List<ClienteGetDto>();
            for (int i = 0; i < clien.Count; i++)
            {

                if (clien[i].IdEstado != 3)
                {

                    clienteGetDto.Add(_mapper.Map<ClienteGetDto>(clien[i]));
                }
                
            }
            for (int j = 0; j < clienteGetDto.Count; j++)
            {
                var rubro = db.Rubros.Where(x => x.IdRubro == clienteGetDto[j].IdRubro).FirstOrDefault();
                var pais = db.Paises.Where(x => x.IdPais == clienteGetDto[j].IdPais).FirstOrDefault();
                clienteGetDto[j].nombreRubro = rubro.Nombre;
                clienteGetDto[j].nombrePais = pais.Nombre;
            }
            


            return Ok(clienteGetDto);
        }
        [HttpPost]
        public IActionResult CreateCliente(ClienteCreateDto clienteDto)
        {
            if (clienteDto == null)
            {
                BadRequest();
            }
            var clien = _mapper.Map<Cliente>(clienteDto);
            if (db.Clientes.Any(x => x.Documento == clien.Documento))
            {
                return StatusCode(409, "Ya existe un Cliente con ese documento");
            } 
            if (db.Clientes.Any(x => x.NombreFantasia == clien.NombreFantasia))
            {
                return StatusCode(409, "Ya existe un Cliente con esa razón");
            }
            if (db.Clientes.Any(x => x.Nombre == clien.Nombre))
            {
                return StatusCode(409, "Ya existe un Cliente con ese nombre");
            }
            clien.IdEstado = 1;
            clien.FechaAlta = DateTime.Now;
            clien.IdGenero = 1;
            clien.IdTipoDocumento = 1002;

            if (!_cRepo.CreateCliente(clien))
            {
                return StatusCode(500, $"Algo salió mal creando el Cliente {clien.Nombre}");
            }
           
            return Ok($"Cliente {clien.Nombre} creado con exito");
        }
        [HttpPut("{idCliente:int}", Name = "UpdateCliente")]

        public IActionResult UpdateCliente(int idCliente, [FromBody] ClienteUpdateDto clienteUpdateDto)
        {
            if (clienteUpdateDto == null || idCliente != clienteUpdateDto.IdCliente)
            {
                BadRequest();
            }
            if (clienteUpdateDto == null)
            {
                BadRequest();
            }
            //var cliente = _cRepo.GetCliente(idCliente);
            var clien = _mapper.Map<Cliente>(clienteUpdateDto);
            if (db.Clientes.Any(x => x.Documento == clien.Documento && x.IdCliente!=clien.IdCliente))
            {
                return StatusCode(409, "Ya existe un Cliente con ese documento");
            }
            if (db.Clientes.Any(x => x.NombreFantasia == clien.NombreFantasia && x.IdCliente != clien.IdCliente))
            {
                return StatusCode(409, "Ya existe un Cliente con esa razón");
            }
            if (db.Clientes.Any(x => x.Nombre == clien.Nombre && x.IdCliente != clien.IdCliente))
            {
                return StatusCode(409, "Ya existe un Cliente con ese nombre");
            }

            if (!_cRepo.UpdateCliente(clien))
            {
                return StatusCode(500, $"Algo salió mal actulizando el Cliente {clien.Nombre}");
            }

            return Ok($"Cliente {clien.Nombre} actulizado con exito");
        }

        [HttpDelete("{idCliente:int}", Name = "BajaCliente")]
        public IActionResult DeleteCliente(int idCliente)
        {
            if (idCliente == null)
            {
                BadRequest();
            }
            var cand = _cRepo.GetCliente(idCliente);


            if (cand == null)
            {
                return StatusCode(400, "El cliente no existe");
            }

            cand.IdEstado = 3;

            if (!_cRepo.DarDeBajaCliente(cand))
            {
                return StatusCode(500, $"Algo salió mal dando de baja el cliente {cand.Nombre}");
            }

            return Ok($"Cliente {cand.Nombre} dado de baja con exito");
        }

    }
}
