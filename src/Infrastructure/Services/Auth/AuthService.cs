using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Models.Token;
using ServiXpress.Domain;
using Microsoft.Extensions.Options;

namespace ServiXpress.Infrastructure.Services.Auth
{
    public class AuthService : IAuthService
    {
        public JwtSettings _jwtSettings { get; }
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(IOptions<JwtSettings> jwtSettings, IHttpContextAccessor httpContextAccessor)
        {
            _jwtSettings = jwtSettings.Value;
            _httpContextAccessor = httpContextAccessor;
        }

        // El método CreateToken genera un token JWT basado en el usuario y roles proporcionados
        public string CreateToken(Usuario usuario, IList<string>? roles)
        {
            // Crea una lista de claims para el token
            var claims = new List<Claim> {
            new Claim(JwtRegisteredClaimNames.NameId, usuario.UserName!),
            new Claim("userId", usuario.Id),
            new Claim("email", usuario.Email!)
            };

            // Agrega los claims de roles a la lista de claims
            foreach (var rol in roles!)
            {
                var claim = new Claim(ClaimTypes.Role, rol);
                claims.Add(claim);
            }

            // Crea una clave de seguridad simétrica basada en la configuración JWT
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key!));

            // Crea las credenciales de firma del token
            var credenciales = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);


            // Crea la descripción del token
            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.Add(_jwtSettings.ExpireTime),
                SigningCredentials = credenciales
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            // Crea el token utilizando el token handler y la descripción del token
            var token = tokenHandler.CreateToken(tokenDescription);

            // Devuelve el token como una cadena de texto
            return tokenHandler.WriteToken(token);
        }

        // El método GetSessionUser devuelve el identificador de usuario de la sesión actual
        public string GetSessionUser()
        {
            var userInSession = _httpContextAccessor.HttpContext!.User?.Claims?
             .FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;

            return userInSession!;
        }
    }
}
