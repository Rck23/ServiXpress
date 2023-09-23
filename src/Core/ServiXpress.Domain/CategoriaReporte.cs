using ServiXpress.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiXpress.Domain
{
    public class CategoriaReporte : BaseDomainModel
    {
        [Key]
        [StringLength(100)]
        public string Nombre { get; set; }
    }
}
