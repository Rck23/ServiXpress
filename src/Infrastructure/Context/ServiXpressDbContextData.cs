using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using ServiXpress.Application.Models.Authorization;
using ServiXpress.Domain;
using System.Data;

namespace ServiXpress.Infrastructure.Context
{
    public class ServiXpressDbContextData
    {
        /// <summary>
        /// Carga los datos iniciales en el contexto de la base de datos.
        /// </summary>
        /// <param name="context">Contexto de la base de datos.</param>
        /// <param name="userManager">Administrador de usuarios.</param>
        /// <param name="roleManager">Administrador de roles.</param>
        /// <param name="loggerFactory">Factoría de registros.</param>
        public static async Task LoadDataAsync(ServiXpressDbContext context,
              UserManager<Usuario> userManager,
              RoleManager<IdentityRole> roleManager,
              ILoggerFactory loggerFactory)
        {

            try
            {
                if (!roleManager.Roles.Any())
                {
                    await roleManager.CreateAsync(new IdentityRole(RolesAPI.AGENTE));
                    await roleManager.CreateAsync(new IdentityRole(RolesAPI.CLIENTE));
                    await roleManager.CreateAsync(new IdentityRole(RolesAPI.TRABAJADOR));

                    if (!userManager.Users.Any())
                    {
                        var usuarioAdmin = new Usuario
                        {
                            Nombre = "Administrador",
                            Apellidos = "GE",
                            Email = "admin@gmail.com",
                            Telefono = "4495231546",
                            Calle = "Zena",
                            NumExterior = 342,
                            NumInterior = 4,
                            ColoniaFraccionamiento = "Blanca",
                            CodigoPostal = "23122",
                            Municipio = "Ags",
                            Estado = "Aguascalientes",
                            Descripcion = "Descripcion pro",
                            FechaHoraRegistro = new DateTime(2023, 9, 15),


                            AvatarUrl = "https://i.pinimg.com/originals/77/25/6b/77256b860c831fa87472e6d391af51db.png"
                        };
                        await userManager.CreateAsync(usuarioAdmin);
                        await userManager.AddToRoleAsync(usuarioAdmin, RolesAPI.AGENTE);

                        var usuarioTrabajador = new Usuario
                        {
                            Nombre = "River",
                            Apellidos = "Gonzales",
                            Email = "Trabajador1@gmail.com",
                            Telefono = "4495108094",
                            Calle = "Zena",
                            NumExterior = 331,
                            
                            ColoniaFraccionamiento = "Blanca",
                            CodigoPostal = "23122",
                            Municipio = "Ags",
                            Estado = "Aguascalientes",
                            Descripcion = "Descripcion pro",
                            FechaHoraRegistro = new DateTime(2023, 7, 23),
                            AvatarUrl = "https://i.pinimg.com/originals/10/93/63/109363a9ae3feac1613a4d04e8af5e8c.png"
                        };
                        await userManager.CreateAsync(usuarioTrabajador, "PasswordUser123$54");
                        await userManager.AddToRoleAsync(usuarioTrabajador, RolesAPI.TRABAJADOR);


                        var usuarioCliente = new Usuario
                        {
                            Nombre = "Kevin",
                            Apellidos = "Michelin",
                            Email = "Cliente1@gmail.com",
                            Telefono = "4495108974",
                            Calle = "Sihai",
                            NumExterior = 653,
                            NumInterior = 9,
                            ColoniaFraccionamiento = "Blanca",
                            CodigoPostal = "81232",
                            Municipio = "Ags",
                            Estado = "Aguascalientes",
                            Descripcion = "Descripcion pro",
                            
                            AvatarUrl = "https://i.pinimg.com/originals/10/93/63/109363a9ae3feac1613a4d04e8af5e8c.png"
                        };
                        await userManager.CreateAsync(usuarioCliente, "PasswordUser123$");
                        await userManager.AddToRoleAsync(usuarioCliente, RolesAPI.CLIENTE);
                        

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
