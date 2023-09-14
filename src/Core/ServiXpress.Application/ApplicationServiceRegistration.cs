using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ServiXpress.Application
{

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
