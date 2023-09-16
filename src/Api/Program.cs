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



var builder = WebApplication.CreateBuilder(args);

IWebHostEnvironment _env = builder.Environment;

// Add services to the container.

builder.Services.AddControllers();

// AGARRA DATA DE INFRAESTRUCTURE 
builder.Services.AddInfrastructureServices(builder.Configuration);

// AGARRA DATA DE APPLICATION
builder.Services.AddApplicationServices(builder.Configuration);


builder.Configuration.AddJsonFile($"appsettings.{_env.EnvironmentName}.json", optional: false, reloadOnChange: true);

// AGREGACION DE CONTEXT
builder.Services.AddDbContext<ServiXpressDbContext>(options =>
{
   
    options.UseSqlServer(builder.Configuration.GetConnectionString("Conexion"),
        b => b.MigrationsAssembly(typeof(ServiXpressDbContext).Assembly.FullName));
    // para que aparezca en consola todos los querys que se hacen en la utilizacion del sistema.
});

IdentityBuilder identityBuilder = builder.Services.AddIdentityCore<Usuario>();
identityBuilder = new IdentityBuilder(identityBuilder.UserType, identityBuilder.Services);

identityBuilder.AddRoles<IdentityRole>().AddDefaultTokenProviders();
identityBuilder.AddClaimsPrincipalFactory<UserClaimsPrincipalFactory<Usuario, IdentityRole>>();

identityBuilder.AddEntityFrameworkStores<ServiXpressDbContext>();
identityBuilder.AddSignInManager<SignInManager<Usuario>>();

builder.Services.TryAddSingleton<ISystemClock, SystemClock>();


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

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy",
        builder => builder.AllowAnyOrigin()
                            .AllowAnyMethod()
                            .AllowAnyHeader()
    );

});



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
   
//}

app.UseSwagger();
app.UseSwaggerUI();


app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseCors("CorsPolicy");

app.MapControllers();

//// PONER DATOS AUTOMATICAMENTE EN LA BASE DE DATOS
using (var scope = app.Services.CreateScope())
{
    var service = scope.ServiceProvider;
    var loggerFactory = service.GetRequiredService<ILoggerFactory>();

    // INSTANCIAR EL CONTEXT, ROLES, USUARIOS, ETC....
    try
    {
        var context = service.GetRequiredService<ServiXpressDbContext>();
        var usuarioManager = service.GetRequiredService<UserManager<Usuario>>();
        var rolManager = service.GetRequiredService<RoleManager<IdentityRole>>();

        // MIGRAR 
        await context.Database.MigrateAsync();

        //LLAMAR A LA DATA
        await ServiXpressDbContextData.LoadDataAsync(context, usuarioManager, rolManager, loggerFactory);

    }
    catch (Exception ex)
    {
        var logger = loggerFactory.CreateLogger<Program>();
        logger.LogError(ex, "Error al migrar los datos");
    }

}



app.Run();
