using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class Reporte
{
    public int Id { get; set; }

    public string Descripcion { get; set; } = null!;

    public DateTime FechaHoraRegistro { get; set; }

    public DateTime? FechaHoraCierre { get; set; }

    public string UsuarioId { get; set; } = null!;

    public string UsuarioReportarId { get; set; } = null!;

    public string Estatus { get; set; } = null!;

    public int CategoriaId { get; set; }

    public string? AgenteCierraReporteId { get; set; }

    public string? DescripcionAgente { get; set; }

    public virtual AspNetUser? AgenteCierraReporte { get; set; }

    public virtual CategoriaReporte Categoria { get; set; } = null!;

    public virtual EstatusReporte EstatusNavigation { get; set; } = null!;

    public virtual AspNetUser Usuario { get; set; } = null!;

    public virtual AspNetUser UsuarioReportar { get; set; } = null!;
}
