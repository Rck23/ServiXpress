using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class CategoriasServicio
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public DateTime FechaHoraRegistro { get; set; }

    public virtual ICollection<Servicio> Servicios { get; } = new List<Servicio>();
}
