using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ServiXpress.Application
{

    /// <summary>
    /// El propósito de este método es agregar los servicios de la aplicación 
    /// al contenedor de servicios. Es común utilizar este método para configurar 
    /// la inyección de dependencias y registrar los servicios necesarios para la aplicación.
    /// </summary>
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration configuration)
        {
            // AQUI VA LA CONFIGURACION DEL MAPEO 

            return services;
        }
    }
}
