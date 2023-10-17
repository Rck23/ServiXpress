using System;
using MediatR;
using ServiXpress.Application.Features.Reviews.ViewModels;

namespace ServiXpress.Application.Features.Reviews.Commands.CreateReviewService
{
	public class CreateReviewUser : IRequest<ReviewVm>
    {

        //public int Id { get; set; }
        public int CalificacionUser { get; set; }
        public string Comentarios { get; set; }
        //public DateTime FechaHoraRegistro { get; set; }
        //public string UsuarioCalificaId { get; set; }
        public string UsuarioCalificadoId { get; set; }
    }
}

