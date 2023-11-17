using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using ServiXpress.Api.Errors;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Models.Status;
using ServiXpress.Domain;
using System.IO;
using System.Net;

namespace ServiXpress.Api.Middlewares
{
    /// <summary>
    /// La clase ExceptionMiddleware implementa un middleware que se utiliza 
    /// para capturar y manejar excepciones en una aplicación ASP.NET Core.
    /// </summary>
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        private readonly ILogger<ExceptionMiddleware> _logger;

        /// <summary>
        /// El constructor ExceptionMiddleware acepta dos parámetros: next de tipo RequestDelegate y logger 
        /// de tipo ILogger<ExceptionMiddleware>. El parámetro next representa el siguiente middleware en la cadena
        /// de ejecución y el parámetro logger se utiliza para registrar mensajes de error.
        /// </summary>
        /// <param name="next"></param>
        /// <param name="logger"></param>
        public ExceptionMiddleware(
                RequestDelegate next,
                
                ILogger<ExceptionMiddleware> logger
        )
        {
            _next = next;
            _logger = logger;

        }

        /// <summary>
        /// El método InvokeAsync es el método principal del middleware que se invoca cuando se produce una solicitud HTTP. 
        /// Dentro de este método, se envuelve la ejecución del siguiente middleware en un bloque try-catch para capturar 
        /// cualquier excepción que se produzca.
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task InvokeAsync(HttpContext context, UserManager<Usuario> userManager)
        {
            try
            {
                if (context.User.Identity.IsAuthenticated)
                {
                    var user = await userManager.FindByNameAsync(context.User.Identity.Name);
                    if (user != null)
                    {
                        var status = user.Estatus;
                        if (status == EstatusUsuarioAPI.Bloqueado)
                        {
                            await context.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                            context.Response.StatusCode = 403;
                            return;
                        }
                    }
                }

                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                var statusCode = (int)HttpStatusCode.InternalServerError;
                CodeErrorResponse errorResponse;

                switch (ex)
                {
                    

                    case FluentValidation.ValidationException validationException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        var errors = validationException.Errors.Select(ers => ers.ErrorMessage).ToArray();
                        errorResponse = new CodeErrorResponse(statusCode, errors);
                        break;

                    

                    case InvalidCredentialsException invalidCredentialsException:
                        statusCode = (int)HttpStatusCode.Unauthorized;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { invalidCredentialsException.Message });
                        break;

                    case EmailNotFoundException emailNotFoundException:
                        statusCode = (int)HttpStatusCode.NotFound;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { emailNotFoundException.Message });
                        break;

                    case EmailAlreadyExistsException emailAlreadyExistsException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { emailAlreadyExistsException.Message });
                        break;

                    case InvalidRoleException invalidRoleException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { invalidRoleException.Message });
                        break;

                    case UserRegistrationException userRegistrationException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { userRegistrationException.Message });
                        break;

                    case UserNotFoundException userNotFoundException:
                        statusCode = (int)HttpStatusCode.NotFound;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { userNotFoundException.Message });
                        break;

                    case IncorrectPasswordException incorrectPasswordException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { incorrectPasswordException.Message });
                        break;

                    case PasswordChangeException passwordChangeException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { passwordChangeException.Message });
                        break;

                    case PasswordConfirmationMismatchException passwordConfirmationMismatchException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { passwordConfirmationMismatchException.Message });
                        break;

                    case PasswordChangeFailedException passwordChangeFailedException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { passwordChangeFailedException.Message });
                        break;

                    case EmailSendingException emailSendingException:
                        statusCode = (int)HttpStatusCode.InternalServerError;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { emailSendingException.Message });
                        break;

                    case UserUpdateFailedException userUpdateFailedException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { userUpdateFailedException.Message });
                        break;

                        
                    case ServiceNotFoundException serviceNotFoundException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { serviceNotFoundException.Message });
                        break;

                    case ServiceUpdateFailedException serviceUpdateFailedException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { serviceUpdateFailedException.Message });
                        break;

                    case ServiceCreateFailedException serviceCreateFailedException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { serviceCreateFailedException.Message });
                        break;

                    case ServiceQueryFailedException serviceQueryFailedException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { serviceQueryFailedException.Message });
                        break;

                    case CategoryServiceAlreadyExistsException categoryServiceAlreadyExistsException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { categoryServiceAlreadyExistsException.Message });
                        break;


                    case CreateReviewFailedException createReviewFailedException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { createReviewFailedException.Message });
                        break;

                    case FileNotFound1Exception fileNotFoundException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { fileNotFoundException.Message });
                        break;

                    case FileSizeNotSupportException fileSizeNotSupportException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { fileSizeNotSupportException.Message });
                        break;

                    case FileNotSupportException fileNotSupportException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { fileNotSupportException.Message });
                        break;

                    case StatusNotFound statusNotFound:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { statusNotFound.Message });
                        break;

                    case BlockedUser blockedUser:
                        statusCode = (int)HttpStatusCode.Forbidden;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { blockedUser.Message });
                        break;

                    case RoleNotFoundException roleNotFoundException:
                        statusCode = (int)HttpStatusCode.Forbidden;
                        errorResponse = new CodeErrorResponse(statusCode, new[] { roleNotFoundException.Message });
                        break;

                        
                    default:
                        statusCode = (int)HttpStatusCode.InternalServerError;
                        errorResponse = new CodeErrorResponse(statusCode);
                        break;
                }

                var result = JsonConvert.SerializeObject(errorResponse);
                context.Response.StatusCode = statusCode;
                await context.Response.WriteAsync(result);
            }
        }


    }
}
