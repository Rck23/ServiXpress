using System;
using System.ComponentModel.DataAnnotations;
using MediatR;
using ServiXpress.Application.Features.Reviews.ViewModels;

namespace ServiXpress.Application.Features.Reviews.Commands.CreateReviewService
{
	public class CreateReviewUser : IRequest<ReviewVm>
    {

        //public int Id { get; set; }
        [Required(ErrorMessage = "La calificación es requerida")]
        [Range(0, 5, ErrorMessage = "La calificación debe estar entre 0 y 5")]
        public int CalificacionUser { get; set; }

        [Required(ErrorMessage = "Los comentarios son requeridos")]
        public string Comentarios { get; set; }

        //public DateTime FechaHoraRegistro { get; set; }

        //public string UsuarioCalificaId { get; set; }

        [Required(ErrorMessage = "El usuario calificado es requerido")]
        public string UsuarioCalificadoId { get; set; }
    }
}

