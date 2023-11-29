using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class EstatusReporte
{
    public string Estatus { get; set; } = null!;

    public virtual ICollection<Reporte> Reportes { get; } = new List<Reporte>();
}
