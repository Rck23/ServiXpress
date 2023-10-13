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
        public async Task<bool> SendEmail(EmailMessage email, string token)
        {
            try
            {
                var client = new MailjetClient(_emailSettings.MailjetApiKey, _emailSettings.MailjetApiSecret);

                var emailMessage = new TransactionalEmailBuilder()
                    .WithFrom(new SendContact(_emailSettings.Email, "ServiXpress - Olvido de contraseña"))
                    .WithSubject(email.Subject)
                    .WithHtmlPart($"{email.Body} {_emailSettings.BaseUrlClient}/password/reset/{token}")
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
