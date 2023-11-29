using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class EstatusUsuario
{
    public string Estatus { get; set; } = null!;

    public virtual ICollection<AspNetUser> AspNetUsers { get; } = new List<AspNetUser>();
}
