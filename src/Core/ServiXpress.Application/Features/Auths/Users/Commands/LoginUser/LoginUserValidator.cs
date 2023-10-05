using FluentValidation;

namespace ServiXpress.Application.Features.Auths.Users.Commands.LoginUser
{
    public class LoginUserValidator : AbstractValidator<LoginUser>
    {
        public LoginUserValidator()
        {
            RuleFor(x => x.Email)
             .NotEmpty().WithMessage("El correo electrónico no puede ser nulo");

            RuleFor(x => x.Password)
            .NotEmpty().WithMessage("La contraseña no puede ser nula");
        }
    }
}
