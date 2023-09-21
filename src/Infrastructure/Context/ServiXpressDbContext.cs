using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Domain;
using ServiXpress.Domain.Common;

namespace ServiXpress.Infrastructure.Context
{
    /// <summary>
    /// Contexto de la base de datos para el proyecto ServiXpress.
    /// </summary>
    public class ServiXpressDbContext : IdentityDbContext<Usuario>
    {
        /// <summary>
        /// Inicializa una nueva instancia de la clase "ServiXpressDbContext".
        /// </summary>
        /// <param name="dbContext">Opciones de configuración del contexto de la base de datos.</param>
        public ServiXpressDbContext(DbContextOptions<ServiXpressDbContext> dbContext) : base(dbContext)
        {

        }


        /// <summary>
        /// Guarda los cambios asincrónicamente en la base de datos.
        /// </summary>
        /// <param name="cancellationToken">Token de cancelación opcional.</param>
        /// <returns>Un <see cref="Task"/> que representa la operación asincrónica y devuelve el número de entidades afectadas.</returns>
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            var username = "system";

            foreach (var entry in ChangeTracker.Entries<BaseDomainModel>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedDate = DateTime.Now;
                        entry.Entity.CreatedBy = username;
                        break;

                    case EntityState.Modified:
                        entry.Entity.LastModifiedDate = DateTime.Now;
                        entry.Entity.LastModifiedBy = username;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

         /// <summary>
        /// Configura el modelo de la base de datos.
        /// </summary>
        /// <param name="builder">Constructor del modelo.</param>
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // AQUI VA LAS NORMAS DE CATEGORIAS, SERVICIOS, USUARIOS, ETC..


            builder.Entity<Usuario>().Property(x => x.Id).HasMaxLength(36);
            builder.Entity<Usuario>().Property(x => x.NormalizedUserName).HasMaxLength(90);

            builder.Entity<IdentityRole>().Property(x => x.Id).HasMaxLength(36);
            builder.Entity<IdentityRole>().Property(x => x.NormalizedName).HasMaxLength(90);

        }


        // AQUI VA LOS  public DbSet<> DE CATEGORIAS, SERVICIOS, ETC..



    }
}
