using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Domain;
using ServiXpress.Domain.Common;
using System.Reflection.Emit;

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


        // AQUI VA LOS  public DbSet<> DE CATEGORIAS, SERVICIOS, ETC..

        public virtual DbSet<EstatusUsuario> EstatusUsuarios { get; set; }
        public virtual DbSet<EstatusServicio> EstatusServicios { get; set; }
        public virtual DbSet<EstatusReporte> EstatusReportes { get; set; }
        public virtual DbSet<CategoriaReporte> CategoriaReportes { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }
        public virtual DbSet<CategoriaServicio> CategoriasServicios { get; set; }
        public virtual DbSet<TipoServicio> TipoServicios { get; set; }
        public virtual DbSet<Servicio> Servicios { get; set; }
        public virtual DbSet<Calificacion> Calificaciones { get; set; }
        public virtual DbSet<Reporte> Reportes { get; set; }
        public virtual DbSet<Documento> Documentos { get; set; }
        public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }



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
            builder.Entity<Usuario>()
            .HasOne(u => u.EstatusUsuario)
            .WithMany(e => e.Usuarios)
            .HasForeignKey(u => u.Estatus);


            builder.Entity<Servicio>()
               .HasOne(s => s.Usuario)
                .WithMany()
                .HasForeignKey(s => s.UsuarioId)
                 .OnDelete(DeleteBehavior.Restrict); // Opcional, define cómo se comporta la eliminación


            builder.Entity<Servicio>()
                .HasOne(s => s.CategoriaServicio)
                .WithMany()
                .HasForeignKey(s => s.CategoriaId);

            builder.Entity<Servicio>()
                .HasOne(s => s.TipoServicio)
                .WithMany()
                .HasForeignKey(s => s.Tipo);

            builder.Entity<Calificacion>()
            .HasOne(c => c.UsuarioCalifica)
            .WithMany(u => u.CalificacionesHechas)
            .HasForeignKey(c => c.UsuarioCalificaId)
            .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Calificacion>()
                .HasOne(c => c.UsuarioCalificado)
                .WithMany(u => u.CalificacionesRecibidas)
                .HasForeignKey(c => c.UsuarioCalificadoId)
                .OnDelete(DeleteBehavior.Restrict);



            builder.Entity<Reporte>()
            .HasOne(r => r.Usuario)   // La propiedad de navegación en Reporte hacia Usuario
            .WithMany(u => u.Reportes) // La propiedad de navegación en Usuario hacia Reportes
            .HasForeignKey(r => r.UsuarioId) // La clave foránea en Reporte
            .OnDelete(DeleteBehavior.ClientSetNull); // Establece el comportamiento de eliminación a NO ACTION


            builder.Entity<Reporte>()
                .HasOne(r => r.UsuarioReportar)
                .WithMany()
                .HasForeignKey(r => r.UsuarioReportarId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Reporte>()
                .HasOne(r => r.CategoriaReporte)
                .WithMany()
                .HasForeignKey(r => r.CategoriaId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Reporte>()
                .HasOne(r => r.EstatusReporte)
                .WithMany()
                .HasForeignKey(r => r.Estatus)
                .OnDelete(DeleteBehavior.ClientSetNull);

            builder.Entity<Reporte>()
                .HasOne(r => r.AgenteCierraReporte)
                .WithMany()
                .HasForeignKey(r => r.AgenteCierraReporteId)
                .OnDelete(DeleteBehavior.ClientSetNull);


            builder.Entity<Usuario>()
              .HasMany(u => u.Documentos)
              .WithOne(a => a.Usuario)
              .HasForeignKey(a => a.UsuarioId);

            builder.Entity<Usuario>().Property(x => x.Id).HasMaxLength(36);
            builder.Entity<Usuario>().Property(x => x.NormalizedUserName).HasMaxLength(90);

            builder.Entity<IdentityRole>().Property(x => x.Id).HasMaxLength(36);
            builder.Entity<IdentityRole>().Property(x => x.NormalizedName).HasMaxLength(90);


            builder.Entity<Reporte>().Property(r => r.AgenteCierraReporteId).HasMaxLength(36).IsRequired(false);
            builder.Entity<Reporte>().Property(r => r.DescripcionAgente).HasMaxLength(500).IsRequired(false);


            builder.Ignore<IdentityUserToken<string>>();

            builder.Entity<AspNetUserToken>(entity =>
            {
                entity.ToTable("AspNetUserTokens"); // Ensure the correct table name

                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.Property(e => e.UserId).HasMaxLength(36);

                entity.HasOne(d => d.Usuario).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
            });
        }
    }
}
