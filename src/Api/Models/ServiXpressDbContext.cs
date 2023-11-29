using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ServiXpress.Api.Models;

public partial class ServiXpressDbContext : DbContext
{
    public ServiXpressDbContext()
    {
    }

    public ServiXpressDbContext(DbContextOptions<ServiXpressDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetRoleClaim> AspNetRoleClaims { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<AspNetUserClaim> AspNetUserClaims { get; set; }

    public virtual DbSet<AspNetUserLogin> AspNetUserLogins { get; set; }

    public virtual DbSet<AspNetUserToken> AspNetUserTokens { get; set; }

    public virtual DbSet<Calificacione> Calificaciones { get; set; }

    public virtual DbSet<CategoriaReporte> CategoriaReportes { get; set; }

    public virtual DbSet<CategoriasServicio> CategoriasServicios { get; set; }

    public virtual DbSet<Documento> Documentos { get; set; }

    public virtual DbSet<EstatusReporte> EstatusReportes { get; set; }

    public virtual DbSet<EstatusServicio> EstatusServicios { get; set; }

    public virtual DbSet<EstatusUsuario> EstatusUsuarios { get; set; }

    public virtual DbSet<Reporte> Reportes { get; set; }

    public virtual DbSet<Servicio> Servicios { get; set; }

    public virtual DbSet<TipoServicio> TipoServicios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-RRPB998;Database=ServXpressDB;Integrated Security=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasIndex(e => e.NormalizedName, "RoleNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedName] IS NOT NULL)");

            entity.Property(e => e.Id).HasMaxLength(36);
            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(90);
        });

        modelBuilder.Entity<AspNetRoleClaim>(entity =>
        {
            entity.HasIndex(e => e.RoleId, "IX_AspNetRoleClaims_RoleId");

            entity.Property(e => e.RoleId).HasMaxLength(36);

            entity.HasOne(d => d.Role).WithMany(p => p.AspNetRoleClaims).HasForeignKey(d => d.RoleId);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasIndex(e => e.NormalizedEmail, "EmailIndex");

            entity.HasIndex(e => e.Estatus, "IX_AspNetUsers_Estatus");

            entity.HasIndex(e => e.NormalizedUserName, "UserNameIndex")
                .IsUnique()
                .HasFilter("([NormalizedUserName] IS NOT NULL)");

            entity.Property(e => e.Id).HasMaxLength(36);
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.Estatus).HasMaxLength(50);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(90);
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasOne(d => d.EstatusNavigation).WithMany(p => p.AspNetUsers).HasForeignKey(d => d.Estatus);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.HasIndex(new[] { "RoleId" }, "IX_AspNetUserRoles_RoleId");
                    });
        });

        modelBuilder.Entity<AspNetUserClaim>(entity =>
        {
            entity.HasIndex(e => e.UserId, "IX_AspNetUserClaims_UserId");

            entity.Property(e => e.UserId).HasMaxLength(36);

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserClaims).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserLogin>(entity =>
        {
            entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

            entity.HasIndex(e => e.UserId, "IX_AspNetUserLogins_UserId");

            entity.Property(e => e.UserId).HasMaxLength(36);

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserLogins).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<AspNetUserToken>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

            entity.Property(e => e.UserId).HasMaxLength(36);

            entity.HasOne(d => d.User).WithMany(p => p.AspNetUserTokens).HasForeignKey(d => d.UserId);
        });

        modelBuilder.Entity<Calificacione>(entity =>
        {
            entity.HasIndex(e => e.UsuarioCalificaId, "IX_Calificaciones_UsuarioCalificaId");

            entity.HasIndex(e => e.UsuarioCalificadoId, "IX_Calificaciones_UsuarioCalificadoId");

            entity.Property(e => e.UsuarioCalificaId).HasMaxLength(36);
            entity.Property(e => e.UsuarioCalificadoId).HasMaxLength(36);

            entity.HasOne(d => d.UsuarioCalifica).WithMany(p => p.CalificacioneUsuarioCalificas)
                .HasForeignKey(d => d.UsuarioCalificaId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.UsuarioCalificado).WithMany(p => p.CalificacioneUsuarioCalificados)
                .HasForeignKey(d => d.UsuarioCalificadoId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<CategoriaReporte>(entity =>
        {
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<CategoriasServicio>(entity =>
        {
            entity.Property(e => e.Nombre).HasMaxLength(100);
        });

        modelBuilder.Entity<Documento>(entity =>
        {
            entity.HasIndex(e => e.UsuarioId, "IX_Documentos_UsuarioId");

            entity.Property(e => e.FechaCreacion).HasDefaultValueSql("('0001-01-01T00:00:00.0000000')");
            entity.Property(e => e.UsuarioId).HasMaxLength(36);

            entity.HasOne(d => d.Usuario).WithMany(p => p.Documentos).HasForeignKey(d => d.UsuarioId);
        });

        modelBuilder.Entity<EstatusReporte>(entity =>
        {
            entity.HasKey(e => e.Estatus);

            entity.Property(e => e.Estatus).HasMaxLength(50);
        });

        modelBuilder.Entity<EstatusServicio>(entity =>
        {
            entity.HasKey(e => e.Estatus);

            entity.Property(e => e.Estatus).HasMaxLength(50);
        });

        modelBuilder.Entity<EstatusUsuario>(entity =>
        {
            entity.HasKey(e => e.Estatus);

            entity.Property(e => e.Estatus).HasMaxLength(50);
        });

        modelBuilder.Entity<Reporte>(entity =>
        {
            entity.HasIndex(e => e.AgenteCierraReporteId, "IX_Reportes_AgenteCierraReporteId");

            entity.HasIndex(e => e.CategoriaId, "IX_Reportes_CategoriaId");

            entity.HasIndex(e => e.Estatus, "IX_Reportes_Estatus");

            entity.HasIndex(e => e.UsuarioId, "IX_Reportes_UsuarioId");

            entity.HasIndex(e => e.UsuarioReportarId, "IX_Reportes_UsuarioReportarId");

            entity.Property(e => e.AgenteCierraReporteId).HasMaxLength(36);
            entity.Property(e => e.DescripcionAgente).HasMaxLength(500);
            entity.Property(e => e.Estatus)
                .HasMaxLength(50)
                .HasDefaultValueSql("(N'')");
            entity.Property(e => e.UsuarioId).HasMaxLength(36);
            entity.Property(e => e.UsuarioReportarId).HasMaxLength(36);

            entity.HasOne(d => d.AgenteCierraReporte).WithMany(p => p.ReporteAgenteCierraReportes).HasForeignKey(d => d.AgenteCierraReporteId);

            entity.HasOne(d => d.Categoria).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.CategoriaId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.EstatusNavigation).WithMany(p => p.Reportes)
                .HasForeignKey(d => d.Estatus)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.Usuario).WithMany(p => p.ReporteUsuarios)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.UsuarioReportar).WithMany(p => p.ReporteUsuarioReportars)
                .HasForeignKey(d => d.UsuarioReportarId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Servicio>(entity =>
        {
            entity.HasIndex(e => e.CategoriaId, "IX_Servicios_CategoriaId");

            entity.HasIndex(e => e.Tipo, "IX_Servicios_Tipo");

            entity.HasIndex(e => e.UsuarioId, "IX_Servicios_UsuarioId");

            entity.Property(e => e.Tipo).HasMaxLength(50);
            entity.Property(e => e.UsuarioId).HasMaxLength(36);

            entity.HasOne(d => d.Categoria).WithMany(p => p.Servicios).HasForeignKey(d => d.CategoriaId);

            entity.HasOne(d => d.TipoNavigation).WithMany(p => p.Servicios).HasForeignKey(d => d.Tipo);

            entity.HasOne(d => d.Usuario).WithMany(p => p.Servicios)
                .HasForeignKey(d => d.UsuarioId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<TipoServicio>(entity =>
        {
            entity.HasKey(e => e.Tipo);

            entity.Property(e => e.Tipo).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
