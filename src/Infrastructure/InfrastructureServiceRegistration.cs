using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ServiXpress.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {

        public static IServiceCollection AddInfrastructureServices( this IServiceCollection services, 
            IConfiguration configuration)
        {

            // AQUI IRAN TODOS LOS SERVICIOS DEL PROYECTO


            return services; 
        }
    }
}
