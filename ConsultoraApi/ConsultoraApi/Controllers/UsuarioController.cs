using AutoMapper;
using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios;
using ConsultoraApi.Repositorios.IRepositorios;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ConsultoraApi.Controllers
{
    [Route("api/Usuarios")]
    [ApiController]
    [EnableCors("ConsultoraApi")]
    public class UsuarioController : ControllerBase
    {
        private readonly ConsultoraPypContext db;
        IMapper _mapper;
        private readonly IUsuarioRepositorio _uRepo;
        public UsuarioController(IMapper mapper, IUsuarioRepositorio uRepo, ConsultoraPypContext _db)
        {
            _mapper = mapper;
            _uRepo = uRepo;
            db = _db;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var usu = db.Usuarios.ToList();
            if(usu==null || usu.Count == 0)
            {
                return StatusCode(400, "No existe usuarios registrados");
            }
            List<UpdateUsuarioDto> usuarioGetDto = new List<UpdateUsuarioDto>();
            for (int i = 0; i < usu.Count; i++)
            {
                if (usu[i].FechaSalida == null)
                {
                    usuarioGetDto.Add(_mapper.Map<UpdateUsuarioDto>(usu[i]));
                }
            }

            return Ok(usuarioGetDto);
        }

        [HttpGet("{idUsuario:int}", Name = "GetUsuario")]
        public IActionResult GetUsuario(int idUsuario)
        {
            var usuario = _uRepo.GetUsuario(idUsuario);

            if (usuario == null)
            {
                return NotFound();
            }

            var usuarioGetDto = _mapper.Map<UpdateUsuarioDto>(usuario);

            return Ok(usuarioGetDto);
        }


        [HttpPost]
        public IActionResult CreateUsuario(UsuarioCreateDto usuarioDto)
        {
            if(usuarioDto==null)
            {
                BadRequest();
            }
            var usu = _mapper.Map<Usuario>(usuarioDto);
            if(db.Usuarios.Any(x=>x.NombreUsuario== usu.NombreUsuario))
            {
                return StatusCode(409, "Ya existe el mismo nombre de usuario");
            }
            usu.FechaSalida = null;
            usu.FechaAlta = DateTime.Now;
            usu.Password = "awantia";
            if (!_uRepo.CreateUsuario(usu))
            {
                return StatusCode(500, $"Algo salió mal creando el usuario {usu.NombreUsuario}");
            }

            return Ok($"Usuario {usu.NombreUsuario} creado con exito");
        } 
        [HttpPut("{idUsuario:int}", Name = "UpdateUsuario")]
        public IActionResult UpdateUsuario(int idUsuario, [FromBody] UpdateUsuarioDto usuarioUpdateDto)
        {
            if(usuarioUpdateDto == null || idUsuario != usuarioUpdateDto.IdUsuario)
            {
                BadRequest();
            }
            var usuario = _uRepo.GetUsuario(idUsuario);


            if (usuario == null)
            {
                return  StatusCode(400, "El usuario no existe");
            }

            if (db.Usuarios.Any(u => u.NombreUsuario == usuarioUpdateDto.NombreUsuario && u.IdUsuario != idUsuario))
            {
                return StatusCode(409, "El nombre de usuario ya existe");
            }

            usuario.NombreUsuario = usuarioUpdateDto.NombreUsuario;
            usuario.Nombre = usuarioUpdateDto.Nombre;
            usuario.Apellido = usuarioUpdateDto.Apellido;
            usuario.IdTipoDocumento = usuarioUpdateDto.IdTipoDocumento;
            usuario.Documento = usuarioUpdateDto.Documento;
            usuario.Cuil = usuarioUpdateDto.Cuil;
            usuario.Telefono = usuarioUpdateDto.Telefono;
            usuario.Direccion = usuarioUpdateDto.Direccion;
            usuario.FechaNacimiento = usuarioUpdateDto.FechaNacimiento;
            usuario.Mail = usuarioUpdateDto.Mail;
            usuario.IdGenero = usuarioUpdateDto.IdGenero;


            if (!_uRepo.UpdateUsuario(usuario))
            {
                return StatusCode(500, $"Algo salió mal actualizando el registro {usuario.NombreUsuario}");
            }

            return Ok($"Usuario {usuario.NombreUsuario} modificado con exito");         
        }
         [HttpDelete("{idUsuario:int}", Name = "BajaUsuario")]
        public IActionResult DeleteUsuario(int idUsuario)
        {
            if(idUsuario == null)
            {
                BadRequest();
            }
            var usuario = _uRepo.GetUsuario(idUsuario);


            if (usuario == null)
            {
                return  StatusCode(400, "El usuario no existe");
            }

            var usu = _mapper.Map<Usuario>(usuario);
            usu.FechaSalida = DateTime.Now;

            if (!_uRepo.UpdateUsuario(usu))
            {
                return StatusCode(500, $"Algo salió mal actualizando el registro {usu.NombreUsuario}");
            }

            return Ok($"Usuario {usu.NombreUsuario} dado de baja con exito");         
        }
        

    }
}