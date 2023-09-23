using ServiXpress.Domain.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiXpress.Domain
{
    public class EstatusServicio : BaseDomainModel
    {
        public int Id { get; set; }
        [Key]
        [StringLength(50)]
        public string Estatus { get; set; }

    }
}
