using System;
namespace ServiXpress.Application.Exceptions
{
    /* START Features/Auths/Users */

    public class EmailAlreadyExistsException : Exception
    {
        public EmailAlreadyExistsException(string email)
            : base($"El correo electrónico {email} ya existe en la base de datos.")
        {
        }
    }

    public class EmailNotFoundException : Exception
    {
        public EmailNotFoundException(string email) : base($"No se encontró una cuenta con el correo electrónico: {email}.")
        {
        }
    }

    public class InvalidCredentialsException : Exception
    {
        public InvalidCredentialsException() : base("Las credenciales proporcionadas son incorrectas.")
        {
        }

    }

    public class InvalidRoleException : Exception
    {
        public InvalidRoleException()
            : base($"El rol seleccionado no es válido.")
        {
        }
    }

    public class UserNotFoundException : Exception
    {
        public UserNotFoundException()
            : base("El usuario no existe.")
        {
        }
    }

    public class IncorrectPasswordException : Exception
    {
        public IncorrectPasswordException()
            : base("La contraseña ingresada es errónea.")
        {
        }
    }

    public class PasswordChangeException : Exception
    {
        public PasswordChangeException()
            : base("¡Algo salió mal! No se pudo cambiar la contraseña.")
        {
        }
    }

    public class UserRegistrationException : Exception
    {
        public UserRegistrationException() : base("Error al registrar el usuario.")
        {
        }
    }

    public class PasswordConfirmationMismatchException : Exception
    {
        public PasswordConfirmationMismatchException()
            : base("La contraseña no es igual a la confirmación de contraseña.")
        {
        }
    }

    public class PasswordChangeFailedException : Exception
    {
        public PasswordChangeFailedException()
            : base("No se pudo cambiar la contraseña.")
        {
        }
    }

    public class EmailSendingException : Exception
    {
        public EmailSendingException()
            : base("No se pudo enviar el correo electrónico.")
        {
        }
    }

    public class UserUpdateFailedException : Exception
    {
        public UserUpdateFailedException()
            : base("No se pudo actualizar el usuario.")
        {
        }
    }

    /* END Features/Auths/Users */

    /* START Features/Services */

    public class ServiceNotFoundException : Exception
    {
        public ServiceNotFoundException()
            : base("El servicio no existe.")
        {
        }
    }

    public class ServiceCreateFailedException : Exception
    {
        public ServiceCreateFailedException(Exception ex)
            : base("No se pudo crear el servicio.", ex)
        {
        }
    }

    public class ServiceUpdateFailedException : Exception
    {
        public ServiceUpdateFailedException(Exception ex)
            : base("No se pudo actualizar el servicio.", ex)
        {
        }
    }
}

