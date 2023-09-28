using MediatR;
using Microsoft.AspNetCore.Identity;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Application.Models.Authorization;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser
{
    public class RegisterUserHandler : IRequestHandler<RegisterUser, AuthResponse>
    {
        private readonly UserManager<Usuario> _userManager;


        private readonly IAuthService _authService;

        public RegisterUserHandler(UserManager<Usuario> userManager, IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
        }


        public async Task<AuthResponse> Handle(RegisterUser request, CancellationToken cancellationToken)
        {
            var existeEmail = await _userManager.FindByEmailAsync(request.Email!) is null ? false : true;
            if (existeEmail)
            {
                throw new BadRequestException("El correo electrónico ya existe en la base de datos");
            }

            var usuario = new Usuario
            {
                Nombre = request.Nombre,
                UserName = request.Nombre,
                Apellidos = request.Apellidos,
                Telefono = request.Telefono,
                Email = request.Email,

            };

            var resultado = await _userManager.CreateAsync(usuario!, request.Password!);
            if (resultado.Succeeded)
            {
                await _userManager.AddToRoleAsync(usuario, RoleAPI.AGENTE);
                var roles = await _userManager.GetRolesAsync(usuario);

                return new AuthResponse
                {
                    Id = usuario.Id,
                    Nombre = usuario.Nombre,
                    Apellidos = usuario.Apellidos,
                    Telefono = usuario.Telefono,
                    Email = usuario.Email,
                    Token = _authService.CreateToken(usuario, roles),
                    Roles = roles
                };
            }


            throw new Exception("Error al registrar el usuario");
        }
    }
}
