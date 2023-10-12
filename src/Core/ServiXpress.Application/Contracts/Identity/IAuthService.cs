using ServiXpress.Domain;

namespace ServiXpress.Application.Contracts.Identity
{
    public interface IAuthService
    {
        // Método para obtener el usuario de la sesión actual.
        string GetSessionUser();
    

        // Método para crear un token de autenticación para un usuario específico
        // junto con una lista opcional de roles.
        // Parámetros:
        // - usuario: El objeto Usuario para el cual se va a crear el token.
        // - roles: Una lista opcional de roles asociados al usuario (puede ser nula).
        // Retorna:
        // - Un string que representa el token de autenticación generado.
        string CreateToken(Usuario usuario, IList<string>? roles);
    }
}
