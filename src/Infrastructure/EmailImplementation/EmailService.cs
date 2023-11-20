using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Models.Email;
using Mailjet.Client;
using Mailjet.Client.TransactionalEmails;


namespace ServiXpress.Infrastructure.EmailImplementation
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailSettings;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IOptions<EmailSettings> emailSettings, ILogger<EmailService> logger)
        {
            _emailSettings = emailSettings.Value;
            _logger = logger;
        }

        public async Task<bool> SendEmail(EmailMessage email, string codigo)
        {
            try
            {
                var client = new MailjetClient(_emailSettings.MailjetApiKey, _emailSettings.MailjetApiSecret);

                // Leer la plantilla HTML desde un archivo
                var htmlTemplate = File.ReadAllText("./Utilities/EmailHTML/SendCodePassword.html");

                // Reemplazar el marcador de posición con el código
                var htmlBody = htmlTemplate.Replace("{codigo}", codigo);

                var emailMessage = new TransactionalEmailBuilder()
                    .WithFrom(new SendContact(_emailSettings.Email, "ServiXpress - Olvido de contraseña"))
                    .WithSubject(email.Subject)
                    .WithHtmlPart(htmlBody)
                    .WithTo(new SendContact(email.To))
                    .Build();

                var response = await client.SendTransactionalEmailAsync(emailMessage);


                return true;

            }
            catch (Exception ex)
            {
                _logger.LogError($"El correo electrónico no pudo enviarse, existen errores: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> SendRegistrationEmail(EmailMessage email, string nombreUsuario)
        {
            try
            {
                var client = new MailjetClient(_emailSettings.MailjetApiKey, _emailSettings.MailjetApiSecret);

                // Leer la plantilla HTML desde un archivo
                var htmlTemplate = File.ReadAllText("./Utilities/EmailHTML/Registration.html");

                // Reemplazar el marcador de posición con el nombre de usuario
                var htmlBody = htmlTemplate.Replace("{nombreUsuario}", nombreUsuario);

                var emailMessage = new TransactionalEmailBuilder()
                    .WithFrom(new SendContact(_emailSettings.Email, "ServiXpress - Nuevo usuario"))
                    .WithSubject(email.Subject)
                    .WithHtmlPart(htmlBody)
                    .WithTo(new SendContact(email.To))
                    .Build();

                var response = await client.SendTransactionalEmailAsync(emailMessage);

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"El correo electrónico no pudo enviarse, existen errores: {ex.Message}");
                return false;
            }
        }
    }
}
