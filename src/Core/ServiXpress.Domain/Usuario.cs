using Microsoft.AspNetCore.Identity;

namespace ServiXpress.Domain
{
    public class Usuario : IdentityUser
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }
        public bool IsActive { get; set; } = true;


        // PUEDE CONTENER LA IMAGEN DE PERFIL DEL USUARIO
        public string? AvatarUrl { get; set; }
    }
}
