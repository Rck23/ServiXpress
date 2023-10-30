using MediatR;
using Microsoft.AspNetCore.Http;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser
{
    public class RegisterUser : IRequest<AuthResponse>
    {
        [Required(ErrorMessage = "El nombre es requerido")]
        public string Nombre { get; set; }

        [Required(ErrorMessage = "los Apellidos son requerido")]
        public string Apellidos { get; set; }

        [Required(ErrorMessage = "El Teléfono es requerido")]
        public string Telefono { get; set; }

        [Required(ErrorMessage = "El correo electrónico es requerido")]
        [EmailAddress(ErrorMessage = "El correo electrónico debe ser una dirección  válida")]
        public string Email { get; set; }

        [Required(ErrorMessage = "La contraseña es requerida")]
        public string Password { get; set; }

        //CARGAR LA IMAGEN
        public IFormFile? Foto { get; set; }

        public string? FotoUrl { get; set; }

        public string? FotoId { get; set; }



        public enum Roles
        {
            [Display(Name = "CLIENTE")]
            CLIENTE,

            [Display(Name = "TRABAJADOR")]
            TRABAJADOR
        }

        public Roles? Rol { get; set; }


    }
}
