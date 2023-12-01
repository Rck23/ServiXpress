using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class Documento
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Ruta { get; set; } = null!;

    public string UsuarioId { get; set; } = null!;

    public DateTime FechaCreacion { get; set; }

    public virtual AspNetUser Usuario { get; set; } = null!;
}
