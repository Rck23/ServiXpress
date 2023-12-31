﻿using ServiXpress.Application.Models.Email;
using System.Net.Mail;

namespace ServiXpress.Application.Contracts.Infrastructure
{
    public interface IEmailService
    {
        Task<bool> SendEmail(EmailMessage email, string codigo);
        Task<bool> SendRegistrationEmail(EmailMessage email, string userName);
    }
}
