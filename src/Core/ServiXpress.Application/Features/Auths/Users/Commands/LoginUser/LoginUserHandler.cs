using CloudinaryDotNet.Actions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Application.Models.Status;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Auths.Users.Commands.LoginUser
{
    public class LoginUserHandler : IRequestHandler<LoginUser, AuthResponse>
    {
        // Inyección de dependencias de los servicios y administradores necesarios.

        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _sigInManager;

        private readonly RoleManager<IdentityRole> _roleManager;

        private readonly IAuthService _authService;

        private readonly IUnitOfWork _unitOfWork;


        public LoginUserHandler(UserManager<Usuario> userManager, 
            SignInManager<Usuario> sigInManager,
            RoleManager<IdentityRole> roleManager, 
            IAuthService authService, IUnitOfWork unitOfWork)
        {
            _userManager = userManager;
            _sigInManager = sigInManager;
            _roleManager = roleManager;
            _authService = authService;
            _unitOfWork = unitOfWork;
        }

        // Método principal para manejar la solicitud de inicio de sesión.


        public async Task<AuthResponse> Handle(LoginUser request, CancellationToken cancellationToken)
        {
            // Buscar al usuario por su dirección de correo electrónico.

            var user = await _userManager.FindByEmailAsync(request.Email!);
            if (user is null)
            {
                throw new EmailNotFoundException(request.Email!);
            }

            if (user.Estatus == EstatusUsuarioAPI.Bloqueado)
            {
                throw new BlockedUser();
            }

            // Verificar las credenciales del usuario.

            var resultado = await _sigInManager.CheckPasswordSignInAsync(user, request.Password!, false);

            if (!resultado.Succeeded)
            {
                throw new InvalidCredentialsException();
            }

            // Obtener los roles del usuario.

            var roles = await _userManager.GetRolesAsync(user);

            // Crear una respuesta de autenticación.

            var authRes = new AuthResponse
            {
                Id = user.Id,
                Nombre = user.Nombre,
                Apellidos = user.Apellidos,
                Telefono = user.Telefono,
                Email = user.Email,
                AvatarUrl = user.AvatarUrl,
                Token = _authService.CreateToken(user, roles),
                Roles = roles,
                Estado = user.Estado,
                Estatus = user.Estatus,
                Calle = user.Calle,
                CodigoPostal = user.CodigoPostal,
                ColoniaFraccionamiento = user.ColoniaFraccionamiento,
                Descripcion = user.Descripcion,
                FechaHoraRegistro = user.FechaHoraRegistro,
                Municipio = user.Municipio,
                NumExterior = user.NumExterior,
                NumInterior = user.NumInterior
            };

            return authRes; // Devolver la respuesta de autenticación.
        }
    }
}
