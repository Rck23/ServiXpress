using ServiXpress.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Domain
{
	public class EstatusReporte
    {
        [Key]
        [StringLength(50)]
        public string Estatus { get; set; }

    }
}

