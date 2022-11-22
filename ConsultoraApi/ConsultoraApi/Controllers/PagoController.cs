using AutoMapper;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosPagos;
using ConsultoraApi.Dtos.DtosPagos;
using ConsultoraApi.Dtos.DtosPagos;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Pagos")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class PagoController : ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        IMapper _mapper;
        private readonly IPagoRepositorio _pRepo;
        private readonly IEmpleoRepositorio _eRepo;

        public PagoController(ConsultoraPypContext _db, IMapper mapper, IPagoRepositorio uRepo, IEmpleoRepositorio eRepo)
        {
            db = _db;
            _mapper = mapper;
            _pRepo = uRepo;
            _eRepo = eRepo; 
        }
        [HttpGet]
        public IActionResult Get()
        {
            var pago = db.Pagos.Where(n=> n.Estado == true).ToList();
            if (pago == null || pago.Count == 0)
            {
                return StatusCode(400, "No existe ningún pago registrado");
            }
            var pagoGetDto = new List<PagoGetDto>();
            for (int i = 0; i < pago.Count; i++)
            {
                pagoGetDto.Add(_mapper.Map<PagoGetDto>(pago[i]));
            }
            if (pagoGetDto == null)
            {
                return StatusCode(409, "No existe ningún pago activo actualmente");
            }
            for (int i = 0; i < pagoGetDto.Count; i++)
            {
                var cliente = db.Clientes.Where(x => x.IdCliente == pagoGetDto[i].IdCliente).FirstOrDefault();
                var empleo = db.Empleos.Where(x => x.IdEmpleo == pagoGetDto[i].IdEmpleo).FirstOrDefault();
                pagoGetDto[i].nombreCliente = cliente.Nombre;
                pagoGetDto[i].nombreEmpleo = empleo.Nombre;
            }

            return Ok(pagoGetDto);

        }
        [HttpGet("GetPagosReporte")]
        public IActionResult GetPagosReporte(DateTime fecha1, DateTime fecha2)
        {
            var pago = db.Pagos.Where(x=>x.FechaPago.Date >= fecha1.Date && x.FechaPago.Date <= fecha2.Date && x.Estado ==true).ToList();
            if (pago == null || pago.Count == 0)
            {
                return StatusCode(400, "No existe ningún pago registrado");
            }
            var pagoGetDto = new List<PagoGetDto>();
            for (int i = 0; i < pago.Count; i++)
            {
                pagoGetDto.Add(_mapper.Map<PagoGetDto>(pago[i]));
            }
            if (pagoGetDto == null)
            {
                return StatusCode(409, "No existe ningún pago activo actualmente");
            }
            for (int i = 0; i < pagoGetDto.Count; i++)
            {
                var cliente = db.Clientes.Where(x => x.IdCliente == pagoGetDto[i].IdCliente).FirstOrDefault();
                var empleo = db.Empleos.Where(x => x.IdEmpleo == pagoGetDto[i].IdEmpleo).FirstOrDefault();
                pagoGetDto[i].nombreCliente = cliente.Nombre;
                pagoGetDto[i].nombreEmpleo = empleo.Nombre;
            }

            return Ok(pagoGetDto);

        }

        [HttpGet("GetPagosFilter")]
        public IActionResult GetPagosFilter([FromQuery] PagoFilterDto filterDto)
        {
            var listaPagos = _pRepo.GetFilterPago(filterDto);
            var listaPagosDto = new List<PagoGetDto>();

            if (listaPagos.Count == 0)
            {
                return StatusCode(409, "No hay pagos con esos filtros");
            }
            int i = 0; //contador que recorre los usuariosGetAllDto
            foreach (var item in listaPagos)
            {

                listaPagosDto.Add(_mapper.Map<PagoGetDto>(item));
                var cliente = db.Clientes.FirstOrDefault(x => x.IdCliente == item.IdCliente);
                listaPagosDto[i].nombreCliente = cliente.Nombre;
                var emp = db.Empleos.FirstOrDefault(x => x.IdEmpleo == item.IdEmpleo);
                listaPagosDto[i].nombreEmpleo = emp.Nombre;
                i++;
            }
            return Ok(listaPagosDto);
        }

        [HttpPost]
        public IActionResult CreatePago(PagoCreateDto pagoDto)
        {
            if (pagoDto == null)
            {
                BadRequest();
            }
            var pago = _mapper.Map<Pago>(pagoDto);

            pago.Estado = true;
            pago.FechaPago = pagoDto.fechaPago;

            if (!_pRepo.CreatePago(pago))
            {
                return StatusCode(500, $"Algo salió mal creando el pago {pago.IdPago} ");
            }
            Empleo emp = _eRepo.GetEmpleo(pagoDto.IdEmpleo);
            Estado est = _eRepo.GetEstado("Finalizado");
            emp.IdEstado = est.IdEstado;
            if (!_eRepo.UpdateEmpleo(emp)){
                return StatusCode(500, $"Algo salió mal actualizando el empleo {emp.Nombre} ");
            }
            return Ok($"Pago {pago.IdPago}  creado con exito");
        }
        [HttpPut("{idPago:int}", Name = "UpdatePago")]
        public IActionResult UpdatePago(int idPago, [FromBody] PagoUpdateDto pagoUpdateDto)
        {
            if (pagoUpdateDto == null || idPago != pagoUpdateDto.IdPago)
            {
                BadRequest();
            }
            var pago = _pRepo.GetPago(idPago);


            if (pago == null)
            {
                return StatusCode(400, "El pago no existe");
            }



            pago.IdCliente = pagoUpdateDto.IdCliente;
            pago.IdEmpleo = pagoUpdateDto.IdEmpleo;
            pago.MontoPago = pagoUpdateDto.montoPago;
            pago.FechaPago = pagoUpdateDto.fechaPago;



            if (!_pRepo.UpdatePago(pago))
            {
                return StatusCode(500, $"Algo salió mal actualizando el Pago {pago.IdPago} ");
            }



            return Ok($"Pago {pago.IdPago} modificado con exito");
        }

        [HttpDelete("{idPago:int}", Name = "BajaPago")]
        public IActionResult DeletePago(int idPago)
        {
            if (idPago == null)
            {
                BadRequest();
            }
            var pago = _pRepo.GetPago(idPago);


            if (pago == null)
            {
                return StatusCode(400, "El pago no existe");
            }

            pago.Estado = false;
            Empleo emp = _eRepo.GetEmpleo(pago.IdEmpleo);
            Estado est = _eRepo.GetEstado("Activo");
            emp.IdEstado = est.IdEstado;
            if (!_eRepo.UpdateEmpleo(emp))
            {
                return StatusCode(500, $"Algo salió mal actualizando el empleo {emp.Nombre} ");
            }
            if (!_pRepo.DarDeBajaPago(pago))
            {
                return StatusCode(500, $"Algo salió mal dando de baja el pago {pago.IdPago}");
            }
            return Ok($"Pago {pago.IdPago} dado de baja con exito");
        }
    }
}
