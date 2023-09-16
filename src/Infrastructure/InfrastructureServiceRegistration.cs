using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiXpress.Application.Models.Token;
using ServiXpress.Application.Persistence;
using ServiXpress.Infrastructure.Repositories;

namespace ServiXpress.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {

        public static IServiceCollection AddInfrastructureServices( this IServiceCollection services, 
            IConfiguration configuration)
        {

            // AQUI IRAN TODOS LOS SERVICIOS DEL PROYECTO


            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped(typeof(IAsyncRepository<>), typeof(RepositoryBase<>));

            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

            return services;
        }
    }
}
