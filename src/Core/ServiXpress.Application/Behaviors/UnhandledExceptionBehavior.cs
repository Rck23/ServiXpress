using MediatR;
using Microsoft.Extensions.Logging;

namespace ServiXpress.Application.Behaviors
{
    // Declaración de una clase genérica llamada UnhandledExceptionBehavior que implementa la interfaz IPipelineBehavior.
    // La clase es genérica y trabaja con tipos TRequest y TResponse que deben implementar IRequest<TResponse>.
    public class UnhandledExceptionBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        // Declaración de una variable miembro privada readonly llamada _logger, que es de tipo ILogger<TRequest>.

        private readonly ILogger<TRequest> _logger;

        // Constructor de la clase UnhandledExceptionBehavior que acepta una instancia de ILogger<TRequest> como parámetro.

        public UnhandledExceptionBehavior(ILogger<TRequest> logger)
        {
            _logger = logger;
        }

        // Implementación del método Handle de la interfaz IPipelineBehavior.
        // Este método se ejecuta para procesar una solicitud (request) y puede ejecutar el siguiente comportamiento en la cadena
        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            try
            {
                // Intenta ejecutar el siguiente comportamiento en la cadena (next()).

                return await next();
            }
            catch (Exception ex)
            {
                // Captura una excepción de tipo Exception que ocurrió durante la ejecución de la solicitud.

                // Obtiene el nombre de la clase del tipo TRequest (el tipo de solicitud) como una cadena.
                var requestName = typeof(TRequest).Name;

                // Registra un error utilizando el logger (_logger) con detalles sobre la excepción y la solicitud
                _logger.LogError(ex, "Application Request: Sucedio una exception para el request {Name} {@Request}", requestName, request);

                // Lanza una nueva excepción del tipo Exception con un mensaje personalizado.
                // Esto podría ser utilizado para controlar errores específicos del comportamiento.
                throw new Exception("Application Request con Errores");
            }




        }
    }
}
