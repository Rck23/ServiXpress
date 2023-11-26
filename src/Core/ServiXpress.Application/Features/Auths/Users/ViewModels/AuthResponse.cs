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

        public string? AvatarUrl { get; set; }

        public ICollection<string>? Roles { get; set; }

        public string? Calle { get; set; }
        public int? NumExterior { get; set; }
        public int? NumInterior { get; set; }
        public string? ColoniaFraccionamiento { get; set; }
        public string? CodigoPostal { get; set; }
        public string? Municipio { get; set; }
        public string? Estado { get; set; }
        public string? Descripcion { get; set; }

        public DateTime? FechaHoraRegistro { get; set; }

        public string? Estatus { get; set; }
    }
}
