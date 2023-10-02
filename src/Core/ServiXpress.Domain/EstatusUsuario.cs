
using System.ComponentModel.DataAnnotations;

namespace ServiXpress.Domain
{
    public class EstatusUsuario 
    {

        [Key]
        [StringLength(50)]
        public string Estatus { get; set; }
        public ICollection<Usuario> Usuarios { get; set; }

      


    }
}
