using ConsultoraApi.Models;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class PagoController
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        [HttpGet]
        [Route("pagos")]
        public ActionResult<RespuestaAPI> Get()
        {
            var resultado = new RespuestaAPI();
            try
            {
                resultado.Ok = true;
                resultado.Respuesta = db.Pagos.ToList();

                return resultado;
            }
            catch (Exception ex)
            {
                resultado.Ok = false;
                resultado.Error = "Error al encontrar pagos";
                return resultado;
            }

        }

    }
}
