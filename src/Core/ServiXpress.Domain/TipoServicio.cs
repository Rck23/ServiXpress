﻿using ServiXpress.Domain.Common;
using System.ComponentModel.DataAnnotations;


namespace ServiXpress.Domain
{
    public class TipoServicio 
    {
        [Key]
        [StringLength(50)]
        public string Tipo { get; set; }
    }
}
