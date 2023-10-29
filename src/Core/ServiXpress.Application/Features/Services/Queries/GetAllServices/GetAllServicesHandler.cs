
using AutoMapper;
using MediatR;
using ServiXpress.Application.Features.Categories.ViewModels;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Services.Queries.GetAllServices
{
    public class GetAllServicesHandler : IRequestHandler<GetAllServices, IReadOnlyList<ServicioVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetAllServicesHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<ServicioVm>> Handle(GetAllServices request, CancellationToken cancellationToken)
        {
            // LISTA DE SERVICIOS
            var servicios = await _unitOfWork.Repository<Servicio>().GetAsync(
                null,
                x => x.OrderBy(y => y.Usuario),
                string.Empty,
                false
            );

            return _mapper.Map<IReadOnlyList<ServicioVm>>(servicios);

        }
    }
}
