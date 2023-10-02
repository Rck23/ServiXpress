using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using ServiXpress.Application.Models.Authorization;
using ServiXpress.Application.Models.Service;
using ServiXpress.Application.Models.Status;
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
                if (!context.EstatusReportes.Any())
                {
                    context.EstatusReportes.Add(new EstatusReporte { Estatus = EstatusReporteAPI.Cerrado });
                    context.EstatusReportes.Add(new EstatusReporte { Estatus = EstatusReporteAPI.Alta });
                    context.EstatusReportes.Add(new EstatusReporte { Estatus = EstatusReporteAPI.Revision });

                }
                if (!context.EstatusUsuarios.Any())
                {
                    context.EstatusUsuarios.Add(new EstatusUsuario { Estatus = EstatusUsuarioAPI.Verificado });
                    context.EstatusUsuarios.Add(new EstatusUsuario { Estatus = EstatusUsuarioAPI.Bloqueado });
                    context.EstatusUsuarios.Add(new EstatusUsuario { Estatus = EstatusUsuarioAPI.Alta });

                }

                if (!context.EstatusServicios.Any())
                {
                    context.EstatusServicios.Add(new EstatusServicio { Estatus = EstatusServicioAPI.Alta });
                    context.EstatusServicios.Add(new EstatusServicio { Estatus = EstatusServicioAPI.Completado });
                    context.EstatusServicios.Add(new EstatusServicio { Estatus = EstatusServicioAPI.Cancelado });
                    context.EstatusServicios.Add(new EstatusServicio { Estatus = EstatusServicioAPI.Rechazado });

                }

                if (!context.TipoServicios.Any())
                {
                    context.TipoServicios.Add(new TipoServicio { Tipo = TipoServicioAPI.Ofertado });
                    context.TipoServicios.Add(new TipoServicio { Tipo = TipoServicioAPI.Requerido });

                }

                if (!roleManager.Roles.Any())
                {
                    await roleManager.CreateAsync(new IdentityRole(RoleAPI.AGENTE));
                    await roleManager.CreateAsync(new IdentityRole(RoleAPI.CLIENTE));
                    await roleManager.CreateAsync(new IdentityRole(RoleAPI.TRABAJADOR));

                    if (!userManager.Users.Any())
                    {
                        var usuarioAdmin = new Usuario
                        {
                            Nombre = "Administrador",
                            UserName = "Administrador",
                            Apellidos = "GE",
                            Email = "admin@gmail.com",
                            Telefono = "4495231546",
                            AvatarUrl = "https://i.pinimg.com/originals/77/25/6b/77256b860c831fa87472e6d391af51db.png"
                        };
                        await userManager.CreateAsync(usuarioAdmin, "PasswordAdmin123*");
                        await userManager.AddToRoleAsync(usuarioAdmin, RoleAPI.AGENTE);

                        var usuarioTrabajador = new Usuario
                        {
                            Nombre = "River",
                            UserName = "River",
                            Apellidos = "Gonzales",
                            Email = "Trabajador1@gmail.com",
                            Telefono = "4495108094",
                            
                            AvatarUrl = "https://i.pinimg.com/originals/10/93/63/109363a9ae3feac1613a4d04e8af5e8c.png"
                        };
                        await userManager.CreateAsync(usuarioTrabajador, "PasswordUser123$54");
                        await userManager.AddToRoleAsync(usuarioTrabajador, RoleAPI.TRABAJADOR);


                        var usuarioCliente = new Usuario
                        {
                            Nombre = "Kevin",
                            UserName = "Kevin",
                            Apellidos = "Michelin",
                            Email = "Cliente1@gmail.com",
                            Telefono = "4495108974",
                            AvatarUrl = "https://i.pinimg.com/originals/10/93/63/109363a9ae3feac1613a4d04e8af5e8c.png"
                        };
                        await userManager.CreateAsync(usuarioCliente, "PasswordUser123$");
                        await userManager.AddToRoleAsync(usuarioCliente, RoleAPI.CLIENTE);

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
