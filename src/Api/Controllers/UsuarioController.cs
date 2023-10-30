using CloudinaryDotNet.Actions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Features.Auths.Users.Commands.LoginUser;
using ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser;
using ServiXpress.Application.Features.Auths.Users.Commands.ResetPassword;
using ServiXpress.Application.Features.Auths.Users.Commands.ResetPasswordByToken;
using ServiXpress.Application.Features.Auths.Users.Commands.SendPassword;
using ServiXpress.Application.Features.Auths.Users.Commands.UpdateUser;
using ServiXpress.Application.Features.Auths.Users.Queries.GetAllUsers;
using ServiXpress.Application.Features.Auths.Users.Queries.GetUserById;
using ServiXpress.Application.Features.Auths.Users.Queries.GetUserByParameters;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Application.Models.Authorization;
using ServiXpress.Application.Models.ImageManagement;


namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IMediator _mediator;
        
        private IManageImageService _manageImageService;

        private ILogger<UsuarioController> _logger;

        public UsuarioController(IMediator mediator, IManageImageService manageImage, ILogger<UsuarioController> logger)
        {
            _mediator = mediator; // Inicializa la instancia del servicio Mediator.
            _manageImageService = manageImage; // Inicializa la instancia del servicio ManageImage.
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost("login", Name = "Login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginUser login)
        {
            _logger.LogInformation("Iniciando sesión");

            try
            {
                // Envia la solicitud de inicio de sesión al servicio Mediator y retorna la respuesta.
                return await _mediator.Send(login);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al iniciar sesión"); // Registra un evento de error
                throw;
            }
        }

        [AllowAnonymous]
        [HttpPost("register", Name = "Register")]
        public async Task<ActionResult<AuthResponse>> Register([FromForm] RegisterUser register)
        {
            if (register.Foto is not null)
            {
                // Si se proporciona una imagen en el formulario de registro, sube la imagen al servicio ManageImage.
                var resultImage = await _manageImageService.UploadImage(new ImageData
                {
                    ImageStream = register.Foto!.OpenReadStream(), // Abre el flujo de datos de la imagen.
                    Nombre = register.Foto.Name // Obtiene el nombre de la imagen.
                }
                );

                register.FotoId = resultImage.PublicId; // Establece el ID público de la imagen en el registro del usuario.
                register.FotoUrl = resultImage.Url; // Establece la URL de la imagen en el registro del usuario.
            }
            _logger.LogInformation("Registrando usuario");

            try
            {

                // Envia la solicitud de registro al servicio Mediator y retorna la respuesta.
                return await _mediator.Send(register);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al registrar usuario"); // Registra un evento de error
                throw;
            }


        }


        // CAMBIAR CONTRASEÑA 
        [AllowAnonymous]
        [HttpPost("ForgotPassword", Name = "ForgotPassword")]
        public async Task<ActionResult<string>> ForgotPassword([FromBody] SendPassword sendPassword)
        {
            _logger.LogInformation("Olvido de contraseña");

            try
            {
                return await _mediator.Send(sendPassword);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo olvido de contraseña"); 
                throw;
            }
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword", Name = "ResetPassword")]
        public async Task<ActionResult<string>> ResetPassword([FromBody] ResetPasswordByToken resetPasswordByToken)
        {
            _logger.LogInformation("Reset de contraseña");

            try
            {

                return await _mediator.Send(resetPasswordByToken);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al resetear la contraseña"); 
                throw;
            }
        }


        // ACTUALIZAR CONTRASEÑA 
        [HttpPost("UpdatePassword", Name = "UpdatePassword")]
        public async Task<ActionResult<Unit>> UpdatePassword([FromBody] ResetPassword resetPassword)
        {
            _logger.LogInformation("Actualizando contraseña");
            try
            {

                return await _mediator.Send(resetPassword);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo actualizar contraseña");
                throw;
            }
        }

        // ACTUALIZAR USUARIO
        [HttpPut("Update", Name = "Update")]
        public async Task<ActionResult<AuthResponse>> Update([FromForm] UpdateUser updateUser)
        {
            _logger.LogInformation("Actulizando usuario");

            try
            {
                // VERERIFICAR LA IMAGEN 
                if (updateUser.Foto is not null)
                {
                    var resultImage = await _manageImageService.UploadImage(new ImageData
                    {
                        ImageStream = updateUser.Foto!.OpenReadStream(),
                        Nombre = updateUser.Foto!.Name
                    });

                    updateUser.FotoId = resultImage.PublicId;
                    updateUser.FotoUrl = resultImage.Url;
                }


                return await _mediator.Send(updateUser);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo actualizar usuario");
                throw;
            }
        }

        // CONSULTA USUARIO POR ID
        [Authorize(Roles = RoleAPI.AGENTE)]
        [HttpGet("{id}", Name = "GetUsuarioById")]
        public async Task<ActionResult<AuthResponse>> GetUsuarioById(string id)
        {
            _logger.LogInformation("Obteniendo usuario por id");

            try
            {

                var query = new GetUserById(id);


                return await _mediator.Send(query);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo obtener usuario por ID");
                throw;
            }
        }

        // CONSULTA TODOS LOS USUARIOS
        [Authorize(Roles = RoleAPI.AGENTE)]
        [HttpGet("all", Name = "GetAllUsers")]
        public async Task<ActionResult<List<AuthResponse>>> GetAllUsers()
        {
            _logger.LogInformation("Obteniendo todos los usuarios");

            try
            {

                var query = new GetAllUsers();

                return await _mediator.Send(query);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo obtener todos los usuarios");
                throw;
            }
        }


        // CONSULTA TODOS LOS USUARIOS
        // [Authorize(Roles = RoleAPI.AGENTE)]
        [AllowAnonymous]
        [HttpGet("userByParameters", Name = "GetUserByParameters")]
        public async Task<ActionResult<List<AuthResponse>>> GetUserByParameters([FromQuery] GetUserByParameters userByParameters)
        {
            _logger.LogInformation("Obteniendo usuario(s) por parametro");

            try
            {
                var authResponses = await _mediator.Send(userByParameters);

                if (!authResponses.Any())
                {
                    return NotFound("No se encontraron usuarios con los criterios de búsqueda proporcionados.");
                }

                return Ok(authResponses);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo obtener usuario(s) por parametro");
                throw;
            }
        }
    }
}
