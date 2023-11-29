using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class Calificacione
{
    public int Id { get; set; }

    public int CalificacionUser { get; set; }

    public string Comentarios { get; set; } = null!;

    public DateTime FechaHoraRegistro { get; set; }

    public string UsuarioCalificaId { get; set; } = null!;

    public string UsuarioCalificadoId { get; set; } = null!;

    public virtual AspNetUser UsuarioCalifica { get; set; } = null!;

    public virtual AspNetUser UsuarioCalificado { get; set; } = null!;
}
