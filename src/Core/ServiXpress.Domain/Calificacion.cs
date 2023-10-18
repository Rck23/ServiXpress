using ServiXpress.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;


namespace ServiXpress.Domain
{
    public class Calificacion
    {
        public int Id { get; set; }
        public int CalificacionUser { get; set; }
        public string Comentarios { get; set; }
        public DateTime FechaHoraRegistro { get; set; }

        [ForeignKey(nameof(UsuarioCalifica))]
        public string UsuarioCalificaId { get; set; }
        public virtual Usuario UsuarioCalifica { get; set; }

        [ForeignKey(nameof(UsuarioCalificado))]
        public string UsuarioCalificadoId { get; set; }
        public virtual Usuario UsuarioCalificado { get; set; }
    }
}
