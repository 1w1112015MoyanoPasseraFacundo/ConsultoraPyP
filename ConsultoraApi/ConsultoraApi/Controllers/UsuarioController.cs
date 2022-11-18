using AutoMapper;
using ConsultoraApi.Dtos.DtosCompetencias;
using ConsultoraApi.Dtos.DtosUsuarios;
using ConsultoraApi.Helpers;
using ConsultoraApi.Models;
using ConsultoraApi.Repositorios;
using ConsultoraApi.Repositorios.IRepositorios;
using ConsultoraApi.Resultados;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;

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
        private readonly IUsuarioXRolRepositorio _rURepo;
        private readonly IJwtAuthenticationManager jwtAuthenticationManager;
        private readonly EmailUtilities _emailUtilities;
        RandomStringGenerator randomString;

        public UsuarioController(IMapper mapper, IUsuarioRepositorio uRepo, ConsultoraPypContext _db, IJwtAuthenticationManager jwtAuthenticationManager, IUsuarioXRolRepositorio rURepo, EmailUtilities emailUtilities, RandomStringGenerator randomString)
        {
            _mapper = mapper;
            _uRepo = uRepo;
            db = _db;
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            _rURepo = rURepo;
            _emailUtilities = emailUtilities;
            this.randomString = randomString;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var usu = db.Usuarios.ToList();
            if (usu == null || usu.Count == 0)
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
            var usuario = _uRepo.GetListUsuario(idUsuario);
            var usuarioGetDto = new UpdateUsuarioDto();
            var lstUsuario = new List<UpdateUsuarioDto>();
            if (usuario == null)
            {
                return NotFound();
            }
            foreach (var item in usuario)
            {
                usuarioGetDto = _mapper.Map<UpdateUsuarioDto>(item);
                lstUsuario.Add(usuarioGetDto);
            }
            return Ok(lstUsuario);
        }

        [HttpGet("GetUsuariosFilter")]
        public IActionResult GetUsuariosFilter([FromQuery] UsuarioFilterDto filterDto)
        {
            var listaCompetencias = _uRepo.GetFilterUsuario(filterDto);

            if (listaCompetencias.Count == 0)
            {
                return StatusCode(409, "No hay usuarios con esos filtros");
            }

            return Ok(listaCompetencias);
        }


        [HttpPost]
        public IActionResult CreateUsuario(UsuarioCreateDto usuarioDto)
        {
            if (usuarioDto == null)
            {
                BadRequest();
            }
            var usu = _mapper.Map<Usuario>(usuarioDto);
            if (_uRepo.UsuarioExists(usuarioDto.NombreUsuario))
            {
                return StatusCode(409, "Ya existe el mismo nombre de usuario");
            }
            if (_uRepo.NumeroDocumentoExists(usuarioDto.Documento))
            {
                return StatusCode(409, "Ya existe un usuario registrado con ese número de documento");
            }
            if (_uRepo.MailExists(usuarioDto.Mail))
            {
                return StatusCode(409, "Ya existe un usuario registrado con ese e-mail");
            }
            if (_uRepo.validarEdad(usuarioDto.FechaNacimiento) < 18)
            {
                return StatusCode(409, "El usuario debe ser mayor de edad");
            }
            if (!_uRepo.IsValid(usuarioDto.Mail))
            {
                return StatusCode(409, "El mail ingresado no contiene el formato esperado");
            }
            usu.FechaSalida = null;
            usu.FechaAlta = DateTime.Now;

            if (!_emailUtilities.SendNewUserEmail(usu.Mail, usu))
            {
                ModelState.AddModelError("", $"Algo salió mal enviando mail al usuario {usu.NombreUsuario}");
                return StatusCode(500, ModelState);
            }

            if (!_uRepo.CreateUsuario(usu))
            {
                return StatusCode(500, $"Algo salió mal creando el usuario {usu.NombreUsuario}");
            }
            UsuariosXrole rolXUsuario = new UsuariosXrole();
            rolXUsuario.IdUsuario = usu.IdUsuario;
            rolXUsuario.IdRol = 2;
            if (!_rURepo.CreateRolXUsuario(rolXUsuario))
            {
                return StatusCode(500, $"Algo salió mal creando el Usuario {rolXUsuario.IdUsuario} X Rol {rolXUsuario.IdRol}");
            }


            return Ok($"Usuario {usu.NombreUsuario} creado con exito");
        }
        [HttpPut("{idUsuario:int}", Name = "UpdateUsuario")]
        public IActionResult UpdateUsuario(int idUsuario, [FromBody] UpdateUsuarioDto usuarioUpdateDto)
        {
            if (usuarioUpdateDto == null || idUsuario != usuarioUpdateDto.IdUsuario)
            {
                BadRequest();
            }
            var usuario = _uRepo.GetUsuario(idUsuario);


            if (_uRepo.UsuarioExists(usuarioUpdateDto.IdUsuario, usuarioUpdateDto.NombreUsuario))
            {
                return StatusCode(409, "Ya existe el mismo nombre de usuario");
            }
            if (_uRepo.NumeroDocumentoExists(usuarioUpdateDto.IdUsuario, usuarioUpdateDto.Documento))
            {
                return StatusCode(409, "Ya existe un usuario registrado con ese número de documento");
            }
            if (_uRepo.MailExists(usuarioUpdateDto.IdUsuario, usuarioUpdateDto.Mail))
            {
                return StatusCode(409, "Ya existe un usuario registrado con ese e-mail");
            }
            if (_uRepo.validarEdad(usuarioUpdateDto.FechaNacimiento) < 18)
            {
                return StatusCode(409, "El usuario debe ser mayor de edad");
            }
            if (!_uRepo.IsValid(usuarioUpdateDto.Mail))
            {
                return StatusCode(409, "El mail ingresado no contiene el formato esperado");
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
            if (idUsuario == null)
            {
                BadRequest();
            }
            var usuario = _uRepo.GetUsuario(idUsuario);


            if (usuario == null)
            {
                return StatusCode(400, "El usuario no existe");
            }

            var usu = _mapper.Map<Usuario>(usuario);
            usu.FechaSalida = DateTime.Now;

            if (!_uRepo.DarDeBajaUsuario(usu))
            {
                return StatusCode(500, $"Algo salió mal dando de baja el usuario {usu.NombreUsuario}");
            }

            return Ok($"Usuario {usu.NombreUsuario} dado de baja con exito");
        }

        [HttpPost]
        [Route("login")]
        public IActionResult Login([FromBody] LoginUsuarioDto comando)
        {
            var token = jwtAuthenticationManager.Authenticate(comando.nombreUsuario, comando.password);

            if (string.IsNullOrEmpty(comando.nombreUsuario))
            {
                return StatusCode(400, "No se ingreso el nombre");
            }
            if (string.IsNullOrEmpty(comando.password))
            {
                return StatusCode(400, "No se ingreso la contraseña");
            }
            var result = db.Usuarios.FirstOrDefault(x => x.NombreUsuario == comando.nombreUsuario && x.Password == comando.password);


            if (result == null)
            {
                return StatusCode(404, "Usuario y/o contraseña incorrecta");
            }
            else
            {
                if (token == null)
                {
                    return Unauthorized();
                }
                else if (result != null)
                {
                    //db.Entry(result).Reference(x => x.UsuariosXroles).Load();
                    var hash = HashHelper.Hash(result.Password);

                    var rolxusu = db.UsuariosXroles.FirstOrDefault(x => x.IdUsuario == result.IdUsuario);
                    var rol = db.Roles.FirstOrDefault(x => x.IdRol == rolxusu.IdRol); result.Password = hash.Password;

                    login lg = new login(result.NombreUsuario, result.Mail, token, rol.Nombre);

                    return Ok(lg);
                }
                else
                {
                    return StatusCode(403, "Usuario o contraseña no válida");
                }
            }
        }
        [HttpGet]
        [Route("login")]
        public IActionResult getLogin([FromQuery] string nombreUsuario)
        {
            var usu = db.Usuarios.FirstOrDefault(x => x.NombreUsuario == nombreUsuario);

            if (usu == null)
            {
                return StatusCode(409);
            }
            else
            {
                var rolxusu = db.UsuariosXroles.FirstOrDefault(x => x.IdUsuario == usu.IdUsuario);
                var rol = db.Roles.FirstOrDefault(x => x.IdRol == rolxusu.IdRol);
                var dto = new GetAuthUsuarioDto { nombreUsuario = usu.NombreUsuario, nombre = usu.Nombre, apellido = usu.Apellido, rol = rol.Nombre, idUsuario = usu.IdUsuario };
                return Ok(dto);
            }
        }

        [HttpPatch]
        [Route("ForgotPasswordUsuario")]
        public IActionResult ForgotPasswordUsuario(string mail)
        {
            if (mail == null || !_uRepo.MailExists(mail))
            {
                return NotFound();
            }

            Usuario usuario = _uRepo.GetUsuario(mail);

            //Generamos el nuevo password.
            string _pg = randomString.GenerarPass();
            byte[] passwordHash, salt;
            usuario.Password = _pg;


            if (!_uRepo.UpdateUsuario(usuario))
            {
                ModelState.AddModelError("Resp", $"Algo salió mal al actualizar la contraseña del registro {usuario.NombreUsuario}");
                return StatusCode(500, ModelState);
            }

            if (!_emailUtilities.SendResetPasswordEmail(mail, usuario.NombreUsuario, _pg))
            {
                ModelState.AddModelError("Resp", $"Algo salió mal al enviar el mail de nueva contraseña para el usuario {usuario.NombreUsuario}");
                return StatusCode(500, ModelState);
            }

            return Ok();
        }
    }
}