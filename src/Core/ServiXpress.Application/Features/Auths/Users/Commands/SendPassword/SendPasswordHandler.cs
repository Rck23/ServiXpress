using MediatR;
using Microsoft.AspNetCore.Identity;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Models.Email;
using ServiXpress.Domain;
using System.Text;

namespace ServiXpress.Application.Features.Auths.Users.Commands.SendPassword
{
    public class SendPasswordHandler : IRequestHandler<SendPassword, string>
    {
        private readonly IEmailService _emailService;
        private readonly UserManager<Usuario> _userManager;

        public SendPasswordHandler(IEmailService emailService, UserManager<Usuario> userManager)
        {
            _emailService = emailService;
            _userManager = userManager;
        }

        public async Task<string> Handle(SendPassword request, CancellationToken cancellationToken)
        {
            // VALIDACION DE USUARIO EXISTE
            var usuario = await _userManager.FindByEmailAsync(request.Email!);
            if (usuario is null)
            {
                throw new BadRequestException("El usuario no existe!");
            }

            //AGREGACION DE TOKEN DE SEGURIDAD 
            var token = await _userManager.GeneratePasswordResetTokenAsync(usuario);
            var plainTextBytes = Encoding.UTF8.GetBytes(token);
            token = Convert.ToBase64String(plainTextBytes);

            // EL MENSAJE QUE SE ENVIARA 
            var emailMessage = new EmailMessage
            {
                To = request.Email,
                Body = "Cambia la contraseña dando click en el siguiente enlace: ",
                Subject = "Cambio de contraseña"
            };

            // ENVIAR EL CORREO
            var result = await _emailService.SendEmail(emailMessage, token);

            if (!result)
            {
                throw new Exception("No se pudo enviar el correo electrónico.");
            }

            return $"Se envio el correo a la cuenta {request.Email}";
        }
    }
}
