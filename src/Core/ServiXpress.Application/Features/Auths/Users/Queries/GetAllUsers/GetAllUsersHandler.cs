using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Auths.Users.Queries.GetAllUsers
{
    public class GetAllUsersHandler : IRequestHandler<GetAllUsers, List<AuthResponse>>
    {
        private readonly UserManager<Usuario> _userManager;

        public GetAllUsersHandler(UserManager<Usuario> userManager)
        {
            _userManager = userManager;
        }

        public async Task<List<AuthResponse>> Handle(GetAllUsers request, CancellationToken cancellationToken)
        {
            var usuarios = await _userManager.Users.ToListAsync();

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
