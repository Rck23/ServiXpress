using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using ServiXpress.Application.Models.Authorization;
using ServiXpress.Domain;
using System.Data;

namespace ServiXpress.Infrastructure.Context
{
    public class ServiXpressDbContextData
    {
        public static async Task LoadDataAsync(ServiXpressDbContext context,
              UserManager<Usuario> userManager,
              RoleManager<IdentityRole> roleManager,
              ILoggerFactory loggerFactory)
        {

            try
            {
                if (!roleManager.Roles.Any())
                {
                    await roleManager.CreateAsync(new IdentityRole(Role.ADMIN));
                    await roleManager.CreateAsync(new IdentityRole(Role.CLIENTE));
                    await roleManager.CreateAsync(new IdentityRole(Role.TRABAJADOR));

                    if (!userManager.Users.Any())
                    {
                        var usuarioAdmin = new Usuario
                        {
                            Nombre = "Administrador",
                            Apellidos = "GE",
                            Email = "admin@gmail.com",
                            UserName = "Admin",
                            Telefono = "4495231546",
                            AvatarUrl = "https://i.pinimg.com/originals/77/25/6b/77256b860c831fa87472e6d391af51db.png"
                        };
                        await userManager.CreateAsync(usuarioAdmin, "PasswordAdmin123*");
                        await userManager.AddToRoleAsync(usuarioAdmin, Role.ADMIN);

                        var usuarioTrabajador = new Usuario
                        {
                            Nombre = "River",
                            Apellidos = "Gonzales",
                            Email = "Trabajador1@gmail.com",
                            UserName = "TrabajadorM",
                            Telefono = "4495108094",
                            AvatarUrl = "https://i.pinimg.com/originals/10/93/63/109363a9ae3feac1613a4d04e8af5e8c.png"
                        };
                        await userManager.CreateAsync(usuarioTrabajador, "PasswordUser123$54");
                        await userManager.AddToRoleAsync(usuarioTrabajador, Role.TRABAJADOR);


                        var usuarioCliente = new Usuario
                        {
                            Nombre = "Kevin",
                            Apellidos = "Michelin",
                            Email = "Cliente1@gmail.com",
                            UserName = "Usuario1",
                            Telefono = "4495108974",
                            AvatarUrl = "https://i.pinimg.com/originals/10/93/63/109363a9ae3feac1613a4d04e8af5e8c.png"
                        };
                        await userManager.CreateAsync(usuarioCliente, "PasswordUser123$");
                        await userManager.AddToRoleAsync(usuarioCliente, Role.CLIENTE);

                    }
                }
            }
            catch (Exception ex)
            {

                var logger = loggerFactory.CreateLogger<ServiXpressDbContextData>();
                logger.LogError(ex.Message);
            }
        }
    }
}
