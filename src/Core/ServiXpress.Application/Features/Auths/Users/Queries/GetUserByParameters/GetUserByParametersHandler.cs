using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Auths.Users.Queries.GetUserByParameters
{
    public class GetUserByParametersHandler : IRequestHandler<GetUserByParameters, List<AuthResponse>>
    {
        private readonly UserManager<Usuario> _userManager;

        public GetUserByParametersHandler(UserManager<Usuario> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<AuthResponse>> Handle(GetUserByParameters request, CancellationToken cancellationToken)
        {
            var usuarios = await _userManager.Users
                .Where(u =>
                    (request.Nombre != null && u.Nombre.Contains(request.Nombre)) ||
                    (request.Apellidos != null && u.Apellidos.Contains(request.Apellidos)) ||
                    (request.Telefono != null && u.Telefono.Contains(request.Telefono)) ||
                    (request.Email != null && u.Email.Contains(request.Email))
                )
                .ToListAsync();


            var authResponses = new List<AuthResponse>();

            foreach (var usuario in usuarios)
            {
                authResponses.Add(new AuthResponse
                {
                    Id = usuario.Id,
                    Nombre = usuario.Nombre,
                    Apellidos = usuario.Apellidos,
                    Telefono = usuario.Telefono,
                    Email = usuario.Email,
                    Avatar = usuario.AvatarUrl,
                    Roles = await _userManager.GetRolesAsync(usuario)
                });
            }

            return authResponses;
        }
    }
}
