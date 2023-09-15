using Microsoft.EntityFrameworkCore;
using ServiXpress.Application;
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



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
