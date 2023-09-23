using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.Tokens;
using ServiXpress.Application;
using ServiXpress.Domain;
using ServiXpress.Infrastructure;
using ServiXpress.Infrastructure.Context;


// Crear el constructor de la aplicación web
var builder = WebApplication.CreateBuilder(args);

// Obtener el entorno de hospedaje
IWebHostEnvironment _env = builder.Environment;

// Agregar servicios al contenedor
builder.Services.AddControllers();

// Agregar servicios de infraestructura
builder.Services.AddInfrastructureServices(builder.Configuration);

// Agregar servicios de aplicación
builder.Services.AddApplicationServices(builder.Configuration);

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

// Configurar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
    );
});

// Configurar Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Construir la aplicación
var app = builder.Build();

// Configurar el pipeline de solicitudes HTTP
app.UseSwagger();
app.UseSwaggerUI();

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
