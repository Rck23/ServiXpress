using MediatR;
using Microsoft.AspNetCore.Identity;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Domain;


namespace ServiXpress.Application.Features.Auths.Users.Queries.GetUserById
{
    public class GetUserByIdHandler : IRequestHandler<GetUserById, AuthResponse>
    {
        private readonly UserManager<Usuario> _userManager;

        public GetUserByIdHandler(UserManager<Usuario> userManager)
        {
            _userManager = userManager;
        }

        public async Task<AuthResponse> Handle(GetUserById request, CancellationToken cancellationToken)
        {
            var usuario = await _userManager.FindByIdAsync(request.UserId!);

            if (usuario is null)
            {
                throw new BadRequestException("El usuario no existe!");
            }

            return new AuthResponse
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellidos = usuario.Apellidos,
                Telefono = usuario.Telefono,
                Email = usuario.Email,
                Avatar = usuario.AvatarUrl,
                Roles = await _userManager.GetRolesAsync(usuario)
            };
         


        }
    }
}
