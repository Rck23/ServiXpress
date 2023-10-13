using MediatR;
using Microsoft.AspNetCore.Http;
using ServiXpress.Application.Features.Auths.Users.ViewModels;

namespace ServiXpress.Application.Features.Auths.Users.Commands.UpdateUser
{
    public class UpdateUser : IRequest<AuthResponse>
    {
        public string Nombre { get; set; }
        public string Apellidos { get; set; }
        public string Telefono { get; set; }
        public string? Email { get; set; }
        public string? Calle { get; set; }
        public int? NumExterior { get; set; }
        public int? NumInterior { get; set; }
        public string? ColoniaFraccionamiento { get; set; }
        public string? CodigoPostal { get; set; }
        public string? Municipio { get; set; }
        public string? Estado { get; set; }
        public string? Descripcion { get; set; }



        public string? FotoUrl { get; set; }
        public string? FotoId { get; set; }
        public IFormFile? Foto { get; set; }
    }
}
