using AutoMapper;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiXpress.Application.Behaviors;
using ServiXpress.Application.Mappings;

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


            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();

            services.AddSingleton(mapper);


            //services.AddTransient(typeof(IPipelineBehavior<,>), typeof(UnhandledExceptionBehavior<,>));
            //services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));


            return services;
            
        }
    }
}
