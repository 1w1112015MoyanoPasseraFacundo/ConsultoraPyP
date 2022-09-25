using AutoMapper;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios.IRepositorios;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/TiposDocumentos")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class TipoDocumentoController : ControllerBase
    {
        private readonly ConsultoraPypContext db;
        IMapper _mapper;
        private readonly ITipoDocumentoRepositorio _tdRepo;
        public TipoDocumentoController(IMapper mapper, ITipoDocumentoRepositorio tdRepo, ConsultoraPypContext _db)
        {
            _mapper = mapper;
            _tdRepo = tdRepo;
            db = _db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var usu = db.TiposDocumentos.ToList();
            if (usu == null || usu.Count == 0)
            {
                return StatusCode(400, "No existen tipos documentos registrados");
            }
            return Ok(usu);
        }

        [HttpPost]
        public IActionResult CreateTipoDocumento(string nombreTipoDocumento)
        {
            if (nombreTipoDocumento == null)
            {
                BadRequest();
            }
            TiposDocumento tipoDoc = new TiposDocumento();
            tipoDoc.Nombre = nombreTipoDocumento;
            var tDoc = _mapper.Map<TiposDocumento>(tipoDoc);
            if (db.TiposDocumentos.Any(x => x.Nombre == tDoc.Nombre))
            {
                return StatusCode(409, "Ya existe el mismo tipo de documento");
            }
            if (!_tdRepo.CreateTipoDocumento(tDoc))
            {
                return StatusCode(500, $"Algo salió mal creando el tipo documento {tDoc.Nombre}");
            }

            return Ok($"Tipo documento {tDoc.Nombre} creado con exito");

        }

        [HttpPatch("{idTipoDocumento:int}", Name = "UpdateTipoDocumento")]
        public IActionResult UpdateTipoDocumento(int idTipoDocumento, string nombreTipoDocumento)
        {
            if (idTipoDocumento == null || nombreTipoDocumento == null)
            {
                return BadRequest();
            }

            if (db.TiposDocumentos.Any(x=>x.Nombre == nombreTipoDocumento))
            {
                return StatusCode(412, "El Tipo de Documento ya existe");
            }
            TiposDocumento tipoDoc = _tdRepo.GetTipoDocumento(idTipoDocumento);
            tipoDoc.Nombre = nombreTipoDocumento;

            if (!_tdRepo.UpdateTipoDocumento(tipoDoc))
            {
                ModelState.AddModelError("", $"Algo salió mal actualizando {tipoDoc.Nombre}");
                return StatusCode(500, ModelState);
            }

            return Ok($"Tipo documento {tipoDoc.Nombre} modificado con exito");
        }
    }
}
