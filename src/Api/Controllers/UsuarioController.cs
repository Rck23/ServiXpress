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

        public UsuarioController(IMediator mediator, IManageImageService manageImage)
        {
            _mediator = mediator; // Inicializa la instancia del servicio Mediator.
            _manageImageService = manageImage; // Inicializa la instancia del servicio ManageImage.

        }

        [AllowAnonymous]
        [HttpPost("login", Name = "Login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginUser login)
        {
            // Envia la solicitud de inicio de sesión al servicio Mediator y retorna la respuesta.
            return await _mediator.Send(login);
        }

        [AllowAnonymous]
        [HttpPost("register", Name = "Register")]
        public async Task<ActionResult<AuthResponse>> Register([FromBody] RegisterUser register)
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

            // Envia la solicitud de registro al servicio Mediator y retorna la respuesta.
            return await _mediator.Send(register);


        }


        // CAMBIAR CONTRASEÑA 
        [AllowAnonymous]
        [HttpPost("ForgotPassword", Name = "ForgotPassword")]
        public async Task<ActionResult<string>> ForgotPassword([FromBody] SendPassword sendPassword)
        {
            return await _mediator.Send(sendPassword);
        }

        [AllowAnonymous]
        [HttpPost("ResetPassword", Name = "ResetPassword")]
        public async Task<ActionResult<string>> ResetPassword([FromBody] ResetPasswordByToken resetPasswordByToken)
        {
            return await _mediator.Send(resetPasswordByToken);
        }


        // ACTUALIZAR CONTRASEÑA 
        [HttpPost("UpdatePassword", Name = "UpdatePassword")]
        public async Task<ActionResult<Unit>> UpdatePassword([FromBody] ResetPassword resetPassword)
        {
            return await _mediator.Send(resetPassword);
        }

        // ACTUALIZAR USUARIO
        [HttpPut("Update", Name = "Update")]
        public async Task<ActionResult<AuthResponse>> Update([FromForm] UpdateUser updateUser)
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

        // CONSULTA USUARIO POR ID
        [Authorize(Roles = RoleAPI.AGENTE)]
        [HttpGet("{id}", Name = "GetUsuarioById")]
        public async Task<ActionResult<AuthResponse>> GetUsuarioById(string id)
        {
            var query = new GetUserById(id);


            return await _mediator.Send(query);
        }

        // CONSULTA TODOS LOS USUARIOS
        [Authorize(Roles = RoleAPI.AGENTE)]
        [HttpGet("all", Name = "GetAllUsers")]
        public async Task<ActionResult<List<AuthResponse>>> GetAllUsers()
        {
            var query = new GetAllUsers();

            return await _mediator.Send(query);
        }
    }
}
