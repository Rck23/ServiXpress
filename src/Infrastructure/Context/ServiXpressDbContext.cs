using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Domain;
using ServiXpress.Domain.Common;

namespace ServiXpress.Infrastructure.Context
{
    public class ServiXpressDbContext : IdentityDbContext<Usuario>
    {
        public ServiXpressDbContext(DbContextOptions<ServiXpressDbContext> dbContext) : base(dbContext)
        {

        }

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
