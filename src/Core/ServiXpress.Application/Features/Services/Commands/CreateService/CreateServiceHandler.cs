

using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;
using System.Security.Claims;

namespace ServiXpress.Application.Features.Services.Commands.CreateService
{
    public class CreateServiceHandler : IRequestHandler<CreateService, ServicioVm>
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IMapper _mapper;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public CreateServiceHandler(IUnitOfWork unitOfWork, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }


        public async Task<ServicioVm> Handle(CreateService request, CancellationToken cancellationToken)
        {
            var usuarioId = _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);

            // LA DATA DEL CLIENTE SE TRANSFORME A UN TIPO PRODUCTO
            var serviceEntity = _mapper.Map<Servicio>(request);
            // Asignar el UsuarioId al objeto Servicio
            serviceEntity.UsuarioId = usuarioId;

            await _unitOfWork.Repository<Servicio>().AddAsync(serviceEntity);

            

            return _mapper.Map<ServicioVm>(serviceEntity);

        }
    }
}
