﻿using System;
using System.Collections.Generic;

namespace ServiXpress.Api.Models;

public partial class AspNetRole
{
    public string Id { get; set; } = null!;

    public string? Name { get; set; }

    public string? NormalizedName { get; set; }

    public string? ConcurrencyStamp { get; set; }

    public virtual ICollection<AspNetRoleClaim> AspNetRoleClaims { get; } = new List<AspNetRoleClaim>();

    public virtual ICollection<AspNetUser> Users { get; } = new List<AspNetUser>();
}
