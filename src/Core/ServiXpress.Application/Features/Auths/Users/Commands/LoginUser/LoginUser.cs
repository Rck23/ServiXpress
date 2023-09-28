using MediatR;
using ServiXpress.Application.Features.Auths.Users.ViewModels;


namespace ServiXpress.Application.Features.Auths.Users.Commands.LoginUser
{
    public class LoginUser : IRequest<AuthResponse>
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
