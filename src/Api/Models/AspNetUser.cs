using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class AspNetUser
{
    public string Id { get; set; } = null!;

    public string? Nombre { get; set; }

    public string? Apellidos { get; set; }

    public string? Telefono { get; set; }

    public string? AvatarUrl { get; set; }

    public string? UserName { get; set; }

    public string? NormalizedUserName { get; set; }

    public string? Email { get; set; }

    public string? NormalizedEmail { get; set; }

    public bool EmailConfirmed { get; set; }

    public string? PasswordHash { get; set; }

    public string? SecurityStamp { get; set; }

    public string? ConcurrencyStamp { get; set; }

    public string? PhoneNumber { get; set; }

    public bool PhoneNumberConfirmed { get; set; }

    public bool TwoFactorEnabled { get; set; }

    public DateTimeOffset? LockoutEnd { get; set; }

    public bool LockoutEnabled { get; set; }

    public int AccessFailedCount { get; set; }

    public string? Calle { get; set; }

    public string? CodigoPostal { get; set; }

    public string? ColoniaFraccionamiento { get; set; }

    public string? Descripcion { get; set; }

    public string? Estado { get; set; }

    public string? Estatus { get; set; }

    public DateTime? FechaHoraRegistro { get; set; }

    public string? Municipio { get; set; }

    public int? NumExterior { get; set; }

    public int? NumInterior { get; set; }

    public virtual ICollection<AspNetUserClaim> AspNetUserClaims { get; } = new List<AspNetUserClaim>();

    public virtual ICollection<AspNetUserLogin> AspNetUserLogins { get; } = new List<AspNetUserLogin>();

    public virtual ICollection<AspNetUserToken> AspNetUserTokens { get; } = new List<AspNetUserToken>();

    public virtual ICollection<Calificacione> CalificacioneUsuarioCalificados { get; } = new List<Calificacione>();

    public virtual ICollection<Calificacione> CalificacioneUsuarioCalificas { get; } = new List<Calificacione>();

    public virtual ICollection<Documento> Documentos { get; } = new List<Documento>();

    public virtual EstatusUsuario? EstatusNavigation { get; set; }

    public virtual ICollection<Reporte> ReporteAgenteCierraReportes { get; } = new List<Reporte>();

    public virtual ICollection<Reporte> ReporteUsuarioReportars { get; } = new List<Reporte>();

    public virtual ICollection<Reporte> ReporteUsuarios { get; } = new List<Reporte>();

    public virtual ICollection<Servicio> Servicios { get; } = new List<Servicio>();

    public virtual ICollection<AspNetRole> Roles { get; } = new List<AspNetRole>();
}
