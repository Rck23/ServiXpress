using System;
using AutoMapper;
using MediatR;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Services.Commands.UpdateService
{
	public class UpdateServiceHandler : IRequestHandler<UpdateService, Servicio>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UpdateServiceHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<Servicio> Handle(UpdateService request, CancellationToken cancellationToken)
        {
            var serviceToUpdate = await _unitOfWork.Repository<Servicio>().GetByIdAsync(request.Id);
            if (serviceToUpdate is null)
            {
                throw new NotFoundException(nameof(Servicio), request.Id);
            }

            _mapper.Map(request, serviceToUpdate, typeof(UpdateService), typeof(Servicio));
            await _unitOfWork.Repository<Servicio>().UpdateAsync(serviceToUpdate);




            return _mapper.Map<Servicio>(serviceToUpdate);
        }
    }
}

