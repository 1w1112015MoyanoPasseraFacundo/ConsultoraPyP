using AutoMapper;
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

        public PagoController(ConsultoraPypContext _db, IMapper mapper, IPagoRepositorio uRepo)
        {
            db = _db;
            _mapper = mapper;
            _pRepo = uRepo;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var pago = db.Pagos.ToList();
            if (pago == null || pago.Count == 0)
            {
                return StatusCode(400, "No existe ningún pago registrado");
            }
            var pagoGetDto = new List<PagoGetDto>();
            for (int i = 0; i < pago.Count; i++)
            {

                if (pago[i].Estado != false)
                {

                    pagoGetDto.Add(_mapper.Map<PagoGetDto>(pago[i]));
                }
            }
            if (pagoGetDto == null)
            {
                return StatusCode(409, "No existe ningún pago activo actualmente");
            }
            for (int i = 0; i < pagoGetDto.Count; i++)
            {
                var cliente = db.Clientes.Where(x => x.IdCliente == pagoGetDto[i].IdCliente).FirstOrDefault();
                pagoGetDto[i].nombreCliente = cliente.Nombre;
            }

            return Ok(pagoGetDto);

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
            pago.FechaPago = DateTime.Now;

            if (!_pRepo.CreatePago(pago))
            {
                return StatusCode(500, $"Algo salió mal creando el pago {pago.IdPago} ");
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

            if (!_pRepo.DarDeBajaPago(pago))
            {
                return StatusCode(500, $"Algo salió mal dando de baja el pago {pago.IdPago}");
            }
     

            return Ok($"Pago {pago.IdPago} dado de baja con exito");
        }
    }
}
