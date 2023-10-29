using System.Text;
using System.Text.Json.Serialization;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using ServiXpress.Api.Middlewares;
using ServiXpress.Application;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Categories.Queries;
using ServiXpress.Domain;
using ServiXpress.Infrastructure;
using ServiXpress.Infrastructure.Context;
using ServiXpress.Infrastructure.ImageCloudinary;


// Crear el constructor de la aplicación web
var builder = WebApplication.CreateBuilder(args);

// Obtener el entorno de hospedaje
IWebHostEnvironment _env = builder.Environment;



// Agregar servicios al contenedor

///Agrega el servicio de controladores a la colección de servicios 
///de la aplicación. El parámetro opt permite configurar opciones adicionales
///para los controladores.
builder.Services.AddControllers(opt =>
{
    ///Crea una política de autorización que requiere que el usuario esté autenticado 
    ///para acceder a los controladores. Esto significa que solo los usuarios 
    ///autenticados podrán acceder a los controladores protegidos por esta política.
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();

    //Agrega un filtro de autorización a los controladores. El filtro de autorización aplica
    //la política de autorización creada anteriormente a los controladores. Esto significa que
    //cualquier solicitud a los controladores protegidos por esta política requerirá que el usuario esté autenticado.
    opt.Filters.Add(new AuthorizeFilter(policy));
}).AddJsonOptions(x =>
{
    //Configura las opciones de serialización JSON para los controladores.
    //En este caso, se establece la opción ReferenceHandler en IgnoreCycles,
    //lo que significa que se ignorarán los ciclos de referencia al serializar
    //objetos JSON. Esto evita errores de serialización causados por referencias circulares
    //entre objetos.
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});


builder.Services.AddMediatR(typeof(GetCategoryServiceList).Assembly);


// Agregar servicios de infraestructura
builder.Services.AddInfrastructureServices(builder.Configuration);

// Agregar servicios de aplicación
builder.Services.AddApplicationServices(builder.Configuration);


//AGREGACION DEL SERVICIO DE IMAGENES
builder.Services.AddScoped<IManageImageService, ManageImageService>();

// Agregar archivo de configuración JSON basado en el entorno
builder.Configuration.AddJsonFile($"appsettings.{_env.EnvironmentName}.json", optional: false, reloadOnChange: true);

// Agregar contexto de base de datos
builder.Services.AddDbContext<ServiXpressDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"),
        b => b.MigrationsAssembly(typeof(ServiXpressDbContext).Assembly.FullName));
    // para que aparezca en consola todos los querys que se hacen en la utilizacion del sistema.
});

// Configurar la identidad
IdentityBuilder identityBuilder = builder.Services.AddIdentityCore<Usuario>();
identityBuilder = new IdentityBuilder(identityBuilder.UserType, identityBuilder.Services);

identityBuilder.AddRoles<IdentityRole>().AddDefaultTokenProviders();
identityBuilder.AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<Usuario, IdentityRole>>();

identityBuilder.AddEntityFrameworkStores<ServiXpressDbContext>();
identityBuilder.AddErrorDescriber<SpanishIdentityErrorDescriber>();
identityBuilder.AddSignInManager<SignInManager<Usuario>>();

builder.Services.TryAddSingleton<ISystemClock, SystemClock>();

// Configurar autenticación JWT
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]!));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opt =>
    {
        opt.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = key,
            ValidateAudience = false,
            ValidateIssuer = false
        };
    });

builder.Services.Configure<IdentityOptions>(options =>
{

    // Configuración de las reglas de validación de contraseñas
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequireUppercase = true;
    options.Password.RequiredLength = 8; // Aumentar la longitud mínima
    options.Password.RequiredUniqueChars = 1; // Requerir más caracteres únicos
    
    // Configuración de las reglas de bloqueo
    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromSeconds(60); // Duración del bloqueo
    options.Lockout.MaxFailedAccessAttempts = 3; // Número máximo de intentos de acceso fallidos
    options.Lockout.AllowedForNewUsers = true;

});


// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
    );
});


Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .WriteTo.File("Logs/logs.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

// Configurar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Construir la aplicación
var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP
app.UseSwagger();
app.UseSwaggerUI();

// AGREGACION DE ExceptionMiddleware
app.UseMiddleware<ExceptionMiddleware>();


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

// Poner datos automáticamente en la base de datos
using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    var loggerFactory = service.GetRequiredService<ILoggerFactory>();

    try
    {
        var context = service.GetRequiredService<ServiXpressDbContext>();
        var usuarioManager = service.GetRequiredService<UserManager<Usuario>>();
        var rolManager = service.GetRequiredService<RoleManager<IdentityRole>>();

        // Migrar la base de datos
        await context.Database.MigrateAsync();

        // Cargar datos
        await ServiXpressDbContextData.LoadDataAsync(context, usuarioManager, rolManager, loggerFactory);
    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "Error al migrar los datos");
    }
}

app.Run();
