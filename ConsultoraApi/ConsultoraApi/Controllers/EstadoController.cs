using ConsultoraApi.Dtos.DtosEmpleos;
using ConsultoraApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Estados")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class EstadoController : ControllerBase
    {

        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        public EstadoController(ConsultoraPypContext _db)
        {
            db = _db;
        }
       [HttpGet]
        public IActionResult Get()
        {
            var empleo = db.Estados.ToList();
            if (empleo == null || empleo.Count == 0)
            {
                return StatusCode(400, "No existe ningún empleo registrado");
            }
            return Ok(empleo);
        }
    }
}
