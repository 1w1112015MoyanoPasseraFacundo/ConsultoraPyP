using AutoMapper;
using ConsultoraApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Generos")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class GeneroController:ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        IMapper _mapper;

        public GeneroController(ConsultoraPypContext _db, IMapper mapper)
        {
                db=_db;
                _mapper=mapper; 
        }

        [HttpGet]
        public IActionResult Get()
        {
            var usu = db.Generos.ToList();
            if (usu == null || usu.Count == 0)
            {
                return StatusCode(400, "No existen géneros registrados");
            }
            return Ok(usu);
        }

    }
}
