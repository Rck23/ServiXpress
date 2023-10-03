using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Features.Auths.Users.Commands.LoginUser;
using ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
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

            // Envia la solicitud de registro al servicio Mediator y retorna la respuesta.
            return await _mediator.Send(register);


        }
    }
}
