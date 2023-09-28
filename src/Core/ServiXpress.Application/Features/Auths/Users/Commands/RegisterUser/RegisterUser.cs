using MediatR;
using ServiXpress.Application.Features.Auths.Users.ViewModels;

namespace ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser
{
    public class RegisterUser : IRequest<AuthResponse>
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }

        public string? Email { get; set; }

        public string? Password { get; set; }
    }
}
