using ServiXpress.Domain.Common;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServiXpress.Domain
{
	public class Calificaciones: BaseDomainModel
    {
        public int Id { get; set; }
        public int Calificacion { get; set; }
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

