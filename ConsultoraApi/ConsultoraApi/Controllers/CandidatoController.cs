using ConsultoraApi.Models;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers

{
    [Route("api/Candidatos")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class CandidatoController
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        [HttpGet]
        public ActionResult<RespuestaAPI> Get()
        {
            var resultado = new RespuestaAPI();
            try
            {
                resultado.Ok = true;
                resultado.Respuesta = db.Candidatos.ToList();

                return resultado;
            }
            catch (Exception ex)
            {
                resultado.Ok = false;
                resultado.Error = "Error al encontrar candidatos";
                return resultado;
            }

        }
    }
}
