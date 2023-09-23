using ServiXpress.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Domain
{
	public class CategoriaReporte: BaseDomainModel
    {
        [Key]
        [StringLength(100)]
        public string Nombre { get; set; }
    }
}

