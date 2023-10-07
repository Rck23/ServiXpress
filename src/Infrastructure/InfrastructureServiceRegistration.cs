using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Models.Email;
using ServiXpress.Application.Models.ImageManagement;
using ServiXpress.Application.Models.Token;
using ServiXpress.Application.Persistence;
using ServiXpress.Infrastructure.EmailImplementation;
using ServiXpress.Infrastructure.Repositories;
using ServiXpress.Infrastructure.Services.Auth;

namespace ServiXpress.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        /// <summary>
        /// El propósito de este método es agregar los servicios de infraestructura 
        /// al contenedor de servicios. Los servicios agregados en este método 
        /// estarán disponibles para su uso en otras partes del proyecto.
        /// </summary>
        public static IServiceCollection AddInfrastructureServices( this IServiceCollection services, 
            IConfiguration configuration)
        {

            // AQUI IRAN TODOS LOS SERVICIOS DEL PROYECTO

            ///Aquí se está registrando la implementación de la interfaz IUnitOfWork
            ///como UnitOfWork. Esto permite que se inyecte UnitOfWork en otras partes 
            ///del proyecto donde se requiera la unidad de trabajo.
            services.AddScoped<IUnitOfWork, UnitOfWork>();

            ///Aquí se está registrando la implementación genérica de IAsyncRepository<> 
            ///como RepositoryBase<>. Esto permite que se inyecte RepositoryBase<> en 
            ///otras partes del proyecto donde se requiera un repositorio asíncrono genérico.
            services.AddScoped(typeof(IAsyncRepository<>), typeof(RepositoryBase<>));

            ///Aquí se está configurando la sección "JwtSettings" de la configuración 
            ///utilizando la clase JwtSettings. Esto permite que se acceda a las propiedades
            ///de JwtSettings a través de la inyección de dependencias.
            services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

            //Servicio de autenticacion de los usuarios
            services.AddTransient<IAuthService, AuthService>();


            ///Aquí se está configurando la sección "CloudinarySettings" de la configuración 
            ///utilizando la clase JwtSettings. Esto permite que se acceda a las propiedades
            ///de CloudinarySettings a través de la inyección de dependencias.
            services.Configure<CloudinarySettings>(configuration.GetSection("CloudinarySettings"));

            services.AddTransient<IEmailService, EmailService>();

            services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));

            return services;
        }
    }
}
