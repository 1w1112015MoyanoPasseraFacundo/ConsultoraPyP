using AutoMapper;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers

{
    [Route("api/Candidatos")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class CandidatoController : ControllerBase
    {
        private readonly ConsultoraPypContext db = new ConsultoraPypContext();
        //IMapper _mapper;
        //private readonly IUsuarioRepositorio _uRepo;

        public CandidatoController(ConsultoraPypContext _db)
        {
            db = _db;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var cand = db.Candidatos.ToList();
            if (cand == null || cand.Count == 0)
            {
                return StatusCode(400, "No existe ningún candidato registrado");
            }
            return Ok(cand);
        }
    }
}
