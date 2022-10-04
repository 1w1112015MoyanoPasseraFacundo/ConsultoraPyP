using AutoMapper;
using ConsultoraApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Rubros")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class RubroController : ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        IMapper _mapper;

        public RubroController(ConsultoraPypContext _db, IMapper mapper)
        {
            db = _db;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var usu = db.Rubros.ToList();
            if (usu == null || usu.Count == 0)
            {
                return StatusCode(400, "No existen rubros registrados");
            }
            return Ok(usu);
        }

    }
}
