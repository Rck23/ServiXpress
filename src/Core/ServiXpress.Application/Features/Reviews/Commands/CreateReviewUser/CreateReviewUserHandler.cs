using System;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Identity;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Reviews.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Reviews.Commands.CreateReviewService
{
	public class CreateReviewUserHandler : IRequestHandler<CreateReviewUser, ReviewVm>
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        private readonly UserManager<Usuario> _userManager;
        private readonly IAuthService _authService;

        public CreateReviewUserHandler(IUnitOfWork unitOfWork, IMapper mapper, UserManager<Usuario> userManager, IAuthService authService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;

            _userManager = userManager;
            _authService = authService;
        }

        public async Task<ReviewVm> Handle(CreateReviewUser request, CancellationToken cancellationToken)
        {
            var UsuarioSession = await _userManager.FindByNameAsync(_authService.GetSessionUser());



            var review = new Calificacion
            {
                CalificacionUser = request.CalificacionUser,
                Comentarios = request.Comentarios,
                FechaHoraRegistro = DateTime.Now,
                UsuarioCalificaId = UsuarioSession.Id,
                UsuarioCalificadoId = request.UsuarioCalificadoId

            };


            //INSERTAR
            _unitOfWork.Repository<Calificacion>().AddEntity(review);
            var resultado = await _unitOfWork.Complete();

            if (resultado <= 0)
            {
                throw new CreateReviewFailedException();
            }

            return _mapper.Map<ReviewVm>(review);

        }
    }
}

