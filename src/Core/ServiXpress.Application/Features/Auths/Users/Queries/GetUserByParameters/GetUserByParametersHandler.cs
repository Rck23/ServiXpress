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
            if (string.IsNullOrEmpty(request.Text)) return new List<AuthResponse>();
            var text = request.Text.ToLower().Trim();
            var usuarios = await _userManager.Users
                .Where(u => u.Nombre.ToLower().Contains(text)
                || u.Apellidos.ToLower().Contains(text)
                || u.Telefono.ToLower().Contains(text)
                || u.Email.ToLower().Contains(text)
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
                    AvatarUrl = usuario.AvatarUrl,
                    Roles = await _userManager.GetRolesAsync(usuario)
                });
            }

            return authResponses;
        }
    }
}
