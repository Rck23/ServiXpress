using CloudinaryDotNet.Actions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Extensions;
using Newtonsoft.Json;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Exceptions;
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
using ServiXpress.Application.Models.Status;
using ServiXpress.Domain;
using ServiXpress.Infrastructure.Context;
using ServiXpress.Infrastructure.Migrations;
using ServiXpress.Infrastructure.Services.Auth;
using System.IO;
using System.Net;
using System.Text;

namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IMediator _mediator;
        private IManageImageService _manageImageService;
        private readonly ServiXpressDbContext _context;
        private ILogger<UsuarioController> _logger;

        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;

        public UsuarioController(IMediator mediator,
            IManageImageService manageImageService, ServiXpressDbContext context,
             UserManager<Usuario> userManager, IAuthService authService, RoleManager<IdentityRole> roleManager,
             ILogger<UsuarioController> logger)
        {
            _mediator = mediator;
            _manageImageService = manageImageService;
            _context = context;
            _logger = logger;
            _userManager = userManager;
            _authService = authService;

            _roleManager = roleManager;
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
                var result = await _mediator.Send(sendPassword);
                if (!string.IsNullOrEmpty(result) && result.Contains("envio el correo"))
                {
                    var userData = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == sendPassword.Email);
                    _context.AspNetUserTokens.Add(new AspNetUserToken
                    {
                        UserId = userData?.Id,
                        LoginProvider = DateTime.Now.ToString(),
                        Name = "Reset Password",
                        Value = result.Split("resultCode").Last()
                    });
                    await _context.SaveChangesAsync();
                }

                return result?.Split("resultCode")?.First() ?? "No se envió el correo correctamente,por favor intente nuevamente.";

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
                if (resetPasswordByToken.Password != resetPasswordByToken.ConfirmPassword)
                    throw new Exception("Las contraseñas no coinciden, revise y vuelva a intentar.");

                var dateNow = DateTime.Now;
                var resetInfo = await _context.AspNetUserTokens.Where(x => x.Value == resetPasswordByToken.Token).ToListAsync();
                var targetResetInfo = resetInfo.FirstOrDefault(x => Convert.ToDateTime(x.LoginProvider).ToShortDateString() == dateNow.ToShortDateString()) ?? throw new Exception("No se ha encontrado una solicitud para actualización de contraseña o ya ha expirado.");
                var updatePassword = new ResetPassword { ConfirmPassword = resetPasswordByToken.ConfirmPassword, NewPassword = resetPasswordByToken.Password, UserId = targetResetInfo.UserId };
                await _mediator.Send(updatePassword);
                return "Se ha actualizado su contraseña, ahora puede ingresar con su nueva contraseña.";
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
        public async Task<ActionResult<List<AuthResponse>>> GetUserByParameters([FromQuery] string text)
        {
            _logger.LogInformation("Obteniendo usuario(s) por parametro");

            try
            {
                var request = new GetUserByParameters { Text = text };
                var authResponses = await _mediator.Send(request);

                return Ok(authResponses);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo obtener usuario(s) por parametro");
                throw;
            }
        }


        [Authorize(Roles = RoleAPI.AGENTE)]
        [HttpPost("changeStatusUser", Name = "ChangeStatusUser")]
        public async Task<IActionResult> ChangeStatusUser([FromBody] ChangeStatusUser user)
        {
            _logger.LogInformation("Cambiando estatus del usuario");

            try
            {
                var usuario = await _context.Usuarios.FindAsync(user.UsuarioId);

                if (usuario != null)
                {
                    
                        usuario.Estatus = user.NuevoEstatus;
                        await _context.SaveChangesAsync();

                        // Devolver un mensaje personalizado
                        return Ok(new { message = $"Se cambió el estatus de {usuario.Nombre} a {user.NuevoEstatus}" });
                }
                else
                {
                    throw new UserNotFoundException();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo cambiar estatus de usuario");
                throw;
            }
        }


        [Authorize(Roles = RoleAPI.AGENTE)]
        //[AllowAnonymous]
        [HttpPost("changeRoleUser", Name = "ChangeRoleUser")]
        public async Task<IActionResult> ChangeRoleUser([FromBody] ChangeRoleUser user)
        {
            _logger.LogInformation("Cambiando rol del usuario");

            try
            {
                var usuario = await _context.Usuarios.FindAsync(user.UsuarioId);

                if (usuario != null)
                {
                    // Verificar si el nuevo rol es válido
                    if (string.Equals(user.NuevoRol, RoleAPI.AGENTE, StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(user.NuevoRol, RoleAPI.CLIENTE, StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(user.NuevoRol, RoleAPI.TRABAJADOR, StringComparison.OrdinalIgnoreCase))
                    {
                        // Aquí es donde necesitas cambiar el rol del usuario
                        var role = await _roleManager.FindByNameAsync(user.NuevoRol);
                        if (role == null)
                        {
                            // Si el rol no existe, crea un nuevo rol
                            role = new IdentityRole(user.NuevoRol);
                            await _roleManager.CreateAsync(role);
                        }

                        // Elimina el usuario de todos los roles actuales
                        var roles = await _userManager.GetRolesAsync(usuario);
                        foreach (var rol in roles)
                        {
                            await _userManager.RemoveFromRoleAsync(usuario, rol);
                        }

                        // Agrega el usuario al nuevo rol
                        await _userManager.AddToRoleAsync(usuario, user.NuevoRol);

                        await _context.SaveChangesAsync();

                        // Devolver un mensaje personalizado
                        return Ok(new { message = $"Se cambió el rol de {usuario.Nombre} a {user.NuevoRol}" });
                    }
                    else
                    {
                        throw new RoleNotFound();
                    }
                }
                else
                {
                    throw new UserNotFoundException();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo cambiar rol de usuario");
                throw;
            }
        }


    }
}
