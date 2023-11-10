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
                throw new UserNotFoundException();
            }

            // GENERACIÓN DE CÓDIGO ALEATORIO
            var codigo = GenerarCodigoAleatorio(10);

            // Establecer la fecha de vencimiento del código
            var codigoExpiration = DateTime.UtcNow.AddMinutes(10);


            // EL MENSAJE QUE SE ENVIARA 
            var emailMessage = new EmailMessage
            {
                To = request.Email,
                Body = "Ingresa el siguiente codigo dentro de la aplicacion: ",
                Subject = "Cambio de contraseña"
            };

            // ENVIAR EL CORREO
            var result = await _emailService.SendEmail(emailMessage, codigo);

            if (!result)
            {
                throw new EmailSendingException();
            }

            return $"Se envio el correo a la cuenta {request.Email}";
        }

        public string GenerarCodigoAleatorio(int longitud)
        {
            const string caracteresPermitidos = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            var random = new Random();
            var caracteres = new char[longitud];

            for (int i = 0; i < longitud; i++)
            {
                caracteres[i] = caracteresPermitidos[random.Next(0, caracteresPermitidos.Length)];
            }

            return new string(caracteres);
        }

    }
}
