using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Auths.Users.Commands.LoginUser;
using ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Application.Models.Authorization;
using ServiXpress.Domain;
using ServiXpress.Infrastructure.Services.Auth;
using System.Net;

namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IMediator _mediator;
        private readonly UserManager<Usuario> _userManager;


        private readonly IAuthService _authService;

        public UsuarioController(IMediator mediator, UserManager<Usuario> userManager, IAuthService authService)
        {
            _mediator = mediator;
            _userManager = userManager;
            _authService = authService;
        }

        [AllowAnonymous]
        [HttpPost("login", Name = "Login")]
        public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginUser login)
        {
            return await _mediator.Send(login);
        }

        [AllowAnonymous]
        [HttpPost("register", Name = "Register")]
        public async Task<ActionResult<AuthResponse>> Register([FromForm] RegisterUser register)
        {
            //if (request.Foto is not null)
            //{
            //    var resultImage = await _manageImageService.UploadImage(new ImageData
            //    {
            //        ImageStream = request.Foto!.OpenReadStream(),
            //        Nombre = request.Foto.Name
            //    }
            //    );

            //    request.FotoId = resultImage.PublicId;
            //    request.FotoUrl = resultImage.Url;
            //}

            return await _mediator.Send(register);


        }
    }
}
