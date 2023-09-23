using ServiXpress.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiXpress.Domain
{
    public class Reporte : BaseDomainModel
    {

        public string Descripcion { get; set; }

        public string DescripcionAgente { get; set; }
        public DateTime FechaHoraRegistro { get; set; }
        public DateTime? FechaHoraCierre { get; set; }

        public string? UsuarioId { get; set; }
        public Usuario Usuario { get; set; }


        public string? UsuarioReportarId { get; set; }
        public Usuario UsuarioReportar { get; set; }

        public string? Categoria { get; set; }
        public CategoriaReporte CategoriaReporte { get; set; }


        public string? Estatus { get; set; }
        public EstatusReporte EstatusReporte { get; set; }

        public string? AgenteCierraReporteId { get; set; }
        public Usuario AgenteCierraReporte { get; set; }


    }
}
