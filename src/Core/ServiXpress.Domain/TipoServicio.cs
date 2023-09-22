using ServiXpress.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Domain
{
	public class TipoServicio: BaseDomainModel
    {
        [Key]
        [StringLength(50)]
        public string Tipo { get; set; }
    }
}

