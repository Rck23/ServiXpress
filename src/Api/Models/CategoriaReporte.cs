using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class CategoriaReporte
{
    public string Nombre { get; set; } = null!;

    public int Id { get; set; }

    public virtual ICollection<Reporte> Reportes { get; } = new List<Reporte>();
}
