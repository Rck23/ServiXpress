using System;
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Domain
{
	public  class Role
    {
         [Key]
    [StringLength(50)]
        public string Roles { get; set; }

        public ICollection<Usuario> Usuarios { get; set; }


    }
}

