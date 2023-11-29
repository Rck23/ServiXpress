using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class TipoServicio
{
    public string Tipo { get; set; } = null!;

    public virtual ICollection<Servicio> Servicios { get; } = new List<Servicio>();
}
