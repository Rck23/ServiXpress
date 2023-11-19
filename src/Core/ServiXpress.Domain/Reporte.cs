
using System.ComponentModel.DataAnnotations.Schema;

namespace ServiXpress.Domain
{
    public class Reporte
    {
        public int Id { get; set; }

        public string Descripcion { get; set; }

        public DateTime FechaHoraRegistro { get; set; }
        public DateTime? FechaHoraCierre { get; set; }

        [ForeignKey("Usuario")]
        public string UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        [ForeignKey("UsuarioReportar")]
        public string UsuarioReportarId { get; set; }
        public Usuario UsuarioReportar { get; set; }


        [ForeignKey("CategoriaReporte")]
        public int CategoriaId { get; set; }
        public CategoriaReporte CategoriaReporte { get; set; }


        [ForeignKey("EstatusReporte")]
        public string? Estatus { get; set; }
        public EstatusReporte EstatusReporte { get; set; }


        public string? DescripcionAgente { get; set; }


        [ForeignKey("AgenteCierraReporte")]
        public string? AgenteCierraReporteId { get; set; }
        public Usuario AgenteCierraReporte { get; set; }


    }
}
