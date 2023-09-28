using FluentValidation;
using MediatR;

namespace ServiXpress.Application.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse>: IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        // Método Handle que se ejecuta como parte del pipeline

        public async Task<TResponse> Handle(
                        TRequest request,
                        RequestHandlerDelegate<TResponse> next,
                        CancellationToken cancellationToken
                        )
        {

            // Comprueba si hay validadores disponibles

            if (_validators.Any())
            {
                // Crea un contexto de validación para la solicitud actual
                var context = new ValidationContext<TRequest>(request);

                // Ejecuta las validaciones asincrónicamente utilizando todos los validadores
                var validationResults = await Task
                    .WhenAll(_validators.Select(v => v.ValidateAsync(context, cancellationToken)));

                // Combina todos los errores de validación en una lista plana
                var failures = validationResults.SelectMany(r => r.Errors).Where(f => f != null).ToList();

                // Si hay errores de validación, lanza una excepción de validación
                if (failures.Count != 0)
                {
                    throw new ValidationException(failures);
                }
            }
            // Si no hay errores de validación, pasa la solicitud al siguiente paso del pipeline
            return await next();
        }
    }
}
