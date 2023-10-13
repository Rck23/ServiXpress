using Newtonsoft.Json;
using ServiXpress.Api.Errors;
using ServiXpress.Application.Exceptions;
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
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                /// Si se produce una excepción, se registra en el logger utilizando _logger.LogError(ex, ex.Message). 
                /// Se establece el tipo de contenido de la respuesta en "application/json" y se inicializan las variables statusCode y result.
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                var statusCode = (int)HttpStatusCode.InternalServerError;
                var result = string.Empty;

                /// Se utiliza una estructura switch para determinar el código de estado y el resultado de la respuesta en función 
                /// del tipo de excepción que se produjo. Por ejemplo, si se produce una excepción NotFoundException, se establece 
                /// el código de estado en 404 (No encontrado).
                switch (ex)
                {
                    case NotFoundException notFoundException:
                        statusCode = (int)HttpStatusCode.NotFound;
                        break;

                    /// Si no se encuentra un resultado específico para la excepción, se crea un objeto CodeErrorException 
                    /// con el código de estado, el mensaje de error y la traza de la excepción. Este objeto se serializa a JSON 
                    /// utilizando la biblioteca JsonConvert.
                    case FluentValidation.ValidationException validationException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        var errors = validationException.Errors.Select(ers => ers.ErrorMessage).ToArray();
                        var validationJsons = JsonConvert.SerializeObject(errors);
                        result = JsonConvert.SerializeObject(
                            new CodeErrorException(statusCode, errors, validationJsons)
                        );
                        break;

                    case BadRequestException badRequestException:
                        statusCode = (int)HttpStatusCode.BadRequest;
                        break;

                    default:
                        statusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                if (string.IsNullOrEmpty(result))
                {
                    result = JsonConvert.SerializeObject(
                        new CodeErrorException(statusCode,
                                                new string[] { ex.Message }, ex.StackTrace));
                }

                /// Finalmente, se establece el código de estado de la respuesta y se escribe el resultado en la respuesta.
                context.Response.StatusCode = statusCode;
                await context.Response.WriteAsync(result);
            }

        }
    }
}
