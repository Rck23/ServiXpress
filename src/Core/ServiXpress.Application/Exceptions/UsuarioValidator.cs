using System;
using ServiXpress.Domain;

namespace ServiXpress.Application.Exceptions
{
    public class UsuarioValidator
    {
        public List<string> Validate(Usuario usuario)
        {
            var validationErrors = new List<string>();

            if (string.IsNullOrEmpty(usuario.Nombre))
            {
                validationErrors.Add("El campo Nombre es obligatorio.");
            }

            if (string.IsNullOrEmpty(usuario.Apellidos))
            {
                validationErrors.Add("El campo Apellidos es obligatorio.");
            }

            if (string.IsNullOrEmpty(usuario.Telefono))
            {
                validationErrors.Add("El campo Teléfono es obligatorio.");
            }

            if (string.IsNullOrEmpty(usuario.Email))
            {
                validationErrors.Add("El campo Email es obligatorio.");
            }
            else if (!IsValidEmail(usuario.Email))
            {
                validationErrors.Add("El campo Email no es una dirección de correo electrónico válida.");
            }

            return validationErrors;
        }

        private bool IsValidEmail(string email)
        {
            // Lógica de validación de dirección de correo electrónico
            // Retorna true si el email es válido, false en caso contrario
            // Verificar si el email es nulo o vacío
            if (string.IsNullOrEmpty(email))
            {
                return false;
            }

            try
            {
                // Utilizar la clase MailAddress para validar el formato del email
                var mailAddress = new System.Net.Mail.MailAddress(email);
                return true;
            }
            catch (FormatException)
            {
                // Capturar la excepción FormatException si el formato del email es inválido
                return false;
            }
        }
    }


}

