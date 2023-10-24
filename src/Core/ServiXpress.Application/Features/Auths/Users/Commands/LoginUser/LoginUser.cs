using MediatR;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Application.Features.Auths.Users.Commands.LoginUser
{
    public class LoginUser : IRequest<AuthResponse>
    {

        [EmailAddress(ErrorMessage = "El correo electrónico debe ser una dirección  válida")]
        public string Email { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; }
    }
}
