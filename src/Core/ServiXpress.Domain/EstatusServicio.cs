using ServiXpress.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Domain
{
	public class EstatusServicio
    {
        [Key]
        [StringLength(50)]
        public string Estatus { get; set; }


    }
}

