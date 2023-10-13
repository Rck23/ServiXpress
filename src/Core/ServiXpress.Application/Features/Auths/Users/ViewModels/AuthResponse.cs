namespace ServiXpress.Application.Features.Auths.Users.ViewModels
{
    public class AuthResponse
    {
        public string? Id { get; set; }

        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }
        public string? Email { get; set; }

        public string? Token { get; set; }


        public string? Avatar { get; set; }

        public ICollection<string>? Roles { get; set; }
    }
}
