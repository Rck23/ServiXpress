using AutoMapper;
using MediatR;
using ServiXpress.Application.Features.Categories.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Categories.Commands.CreateCategory
{

    public class CreateCategoryHandler : IRequestHandler<CreateCategory, CategoriaServicioVm>
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IMapper _mapper;

        public CreateCategoryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CategoriaServicioVm> Handle(CreateCategory request, CancellationToken cancellationToken)
        {
            // LA DATA DEL CLIENTE SE TRANSFORME A UN TIPO PRODUCTO
            var productEntity = _mapper.Map<CategoriaServicio>(request);

            await _unitOfWork.Repository<CategoriaServicio>().AddAsync(productEntity);

            return _mapper.Map<CategoriaServicioVm>(productEntity);

        }
    }
}
