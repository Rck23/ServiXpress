using System;
using FluentValidation;

namespace ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser
{
	public class RegisterUserValidator : AbstractValidator<RegisterUser>
    {
		public RegisterUserValidator()
		{
            RuleFor(x => x.Email).NotEmpty().WithMessage("El correo electrónico es obligatorio");

            RuleFor(x => x.Password).NotEmpty().WithMessage("La contraseña es obligatoria");

            RuleFor(x => x.Nombre).NotEmpty().WithMessage("El nombre es obligatorio");

            RuleFor(x => x.Apellidos).NotEmpty().WithMessage("Los apellidos son obligatorios");

            RuleFor(x => x.Telefono).NotEmpty().WithMessage("El telefono es obligatorio");

            RuleFor(x => x.Rol).NotEmpty().WithMessage("El rol es obligatorio");

        }
    }
}

