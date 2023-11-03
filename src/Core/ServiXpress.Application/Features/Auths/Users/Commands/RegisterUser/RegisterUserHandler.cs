using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.OpenApi.Extensions;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Auths.Users.ViewModels;
using ServiXpress.Domain;
using static ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser.RegisterUser;



namespace ServiXpress.Application.Features.Auths.Users.Commands.RegisterUser
{
    /// <summary>
    /// Clase encargada de manejar el registro de usuarios.
    /// Implementa la interfaz IRequestHandler para manejar la solicitud de tipo RegisterUser
    /// y devuelve una respuesta de tipo AuthResponse.
    /// </summary>
    /// 
 
    public class RegisterUserHandler : IRequestHandler<RegisterUser, AuthResponse>
    {
        private readonly UserManager<Usuario> _userManager;




        private readonly IAuthService _authService;

        /// <summary>
        /// Constructor de la clase RegisterUserHandler.
        /// </summary>
        /// <param name="userManager">UserManager utilizado para administrar los usuarios.</param>
        /// <param name="authService">Servicio de autenticación utilizado para crear tokens.</param>

        public RegisterUserHandler(UserManager<Usuario> userManager, IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
        }


        /// <summary>
        /// Método Handle que procesa la solicitud de registro de un usuario.
        /// </summary>
        /// <param name="request">Solicitud de tipo RegisterUser.</param>
        /// <param name="cancellationToken">Token de cancelación.</param>
        /// <returns>Respuesta de tipo AuthResponse.</returns>

        public async Task<AuthResponse> Handle(RegisterUser request, CancellationToken cancellationToken)
        {
            // Verificar si el correo electrónico ya existe en la base de datos

            var existeEmail = await _userManager.FindByEmailAsync(request.Email!) is null ? false : true;
            if (existeEmail)
            {
                throw new EmailAlreadyExistsException(request.Email!);
            }

            // Crear un nuevo objeto de tipo Usuario con los datos proporcionados

            var usuario = new Usuario
            {
                Nombre = request.Nombre,
                UserName = request.Email,
                Apellidos = request.Apellidos,
                Telefono = request.Telefono,
                Email = request.Email,
                AvatarUrl = request.FotoUrl

            };

            var validator = new UsuarioValidator();
            var validationErrors = validator.Validate(usuario);

            if (validationErrors.Any())
            {
                var mensajeDeError = string.Join(", ", validationErrors);
                throw new UserRegistrationException(mensajeDeError);
            }

            // Crear el usuario utilizando el UserManager y la contraseña proporcionada
            var resultado = await _userManager.CreateAsync(usuario!, request.Password!);

            // Comprueba si la creación del usuario fue exitosa
            if (!resultado.Succeeded)
            {
                // Si la creación del usuario falló, recoge los errores de validación
                var errores = resultado.Errors.Select(e => e.Description);

                // Une los mensajes de error en una sola cadena
                var mensajeDeError = string.Join(", ", errores);

                // Lanza una excepción con los mensajes de error
                throw new UserRegistrationException(mensajeDeError);
            }
            

                // Validar el rol seleccionado por el usuario
                switch (request.Rol)
                {
                    case Roles.CLIENTE:
                    case Roles.TRABAJADOR:
                        break;
                    default:
                        throw new InvalidRoleException();
                }


                await _userManager.AddToRoleAsync(usuario, request.Rol.GetDisplayName());
                // Obtener los roles del usuario
                var roles = await _userManager.GetRolesAsync(usuario);

                // Crear una nueva instancia de AuthResponse con los datos del usuario y el token generado

                return new AuthResponse
                {
                    Id = usuario.Id,
                    Nombre = usuario.Nombre,
                    Apellidos = usuario.Apellidos,
                    Telefono = usuario.Telefono,
                    Email = usuario.Email,
                    Token = _authService.CreateToken(usuario, roles),
                    Avatar = usuario.AvatarUrl,
                    Roles = roles
                };
            


            // throw new UserRegistrationException(message);
        }
    }
}
