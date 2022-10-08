using AutoMapper;
using ConsultoraApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Paises")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class PaisController : ControllerBase
    {
        private readonly ConsultoraPypContext db;

        public PaisController(ConsultoraPypContext _db)
        {
            db = _db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var usu = db.Paises.ToList();
            if (usu == null || usu.Count == 0)
            {
                return StatusCode(400, "No existen paises registrados");
            }
            return Ok(usu);
        }
    }
}
