using MediatR;
using Microsoft.AspNetCore.Identity;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Auths.Users.Commands.UpdateUser
{
    public class UpdateUserHandler : IRequestHandler<UpdateUser, AuthResponse>
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;

        public UpdateUserHandler(UserManager<Usuario> userManager, RoleManager<IdentityRole> roleManager, IAuthService authService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _authService = authService;
        }

        public async Task<AuthResponse> Handle(UpdateUser request, CancellationToken cancellationToken)
        {
            // BUSCAR AL USUARIO A ACTUALIZAR
            var updateUsuario = await _userManager.FindByNameAsync(_authService.GetSessionUser());

            if (updateUsuario is null)
            {
                throw new BadRequestException("El usuario no existe");
            }

            updateUsuario.Nombre = request.Nombre;
            updateUsuario.Apellidos = request.Apellidos;
            updateUsuario.Telefono = request.Telefono;
            updateUsuario.Calle = request.Calle;
            updateUsuario.NumExterior = request.NumExterior;
            updateUsuario.NumInterior = request.NumInterior;
            updateUsuario.ColoniaFraccionamiento = request.ColoniaFraccionamiento;
            updateUsuario.CodigoPostal = request.CodigoPostal;
            updateUsuario.Municipio = request.Municipio;
            updateUsuario.Estado = request.Estado;
            updateUsuario.Descripcion = request.Descripcion; 
            updateUsuario.AvatarUrl = request.FotoUrl ?? updateUsuario.AvatarUrl;  //<-- SI NO SE QUIERE CAMBIAR LA FOTO O ES NULL

            // ACTUALIZAR LOS DATOS
            var resultado = await _userManager.UpdateAsync(updateUsuario);

            if (!resultado.Succeeded)
            {
                throw new BadRequestException("No se pudo actualizo el usuario");
            }

            // OBTENER AL USUARIO YA ACTUALIZADO 
            var userById = await _userManager.FindByEmailAsync(request.Email!);
            var roles = await _userManager.GetRolesAsync(userById!);

            return new AuthResponse
            {
                Id = userById!.Id,
                Nombre = userById.Nombre,
                Apellidos = userById.Apellidos,
                Telefono = userById.Telefono,
                Email = userById.Email,
                Avatar = userById.AvatarUrl,
                Token = _authService.CreateToken(userById, roles),
                Roles = roles
            };
        }
    }
}
