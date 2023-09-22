using ServiXpress.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Domain
{
	public class EstatusUsuario: BaseDomainModel
    {
		
            [Key]
            [StringLength(50)]
            public string Estatus { get; set; }
        public ICollection<Usuario> Usuarios { get; set; }

    }
}

