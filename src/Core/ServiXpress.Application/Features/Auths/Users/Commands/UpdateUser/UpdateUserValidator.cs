using FluentValidation;

namespace ServiXpress.Application.Features.Auths.Users.Commands.UpdateUser
{
    public class UpdateUserValidator : AbstractValidator<UpdateUser>
    {
        public UpdateUserValidator()
        {
            RuleFor(p => p.Nombre).NotEmpty().WithMessage("El nombre no puede ser nulo");
            RuleFor(p => p.Apellidos).NotEmpty().WithMessage("Los apellidos no puede ser nulo");
        }
    }
}
