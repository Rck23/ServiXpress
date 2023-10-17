using AutoMapper;
using MediatR;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Categories.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Categories.Commands.CreateCategoryService
{

    public class CreateCategoryServiceHandler : IRequestHandler<CreateCategoryService, CategoriaServicioVm>
    {
        private readonly IUnitOfWork _unitOfWork;

        private readonly IMapper _mapper;

        public CreateCategoryServiceHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CategoriaServicioVm> Handle(CreateCategoryService request, CancellationToken cancellationToken)
        {
            // Verificar si ya existe una categoría con el mismo nombre en la base de datos
            var existingCategory = await _unitOfWork.Repository<CategoriaServicio>()
                .GetFirstOrDefaultAsync(c => c.Nombre == request.Nombre);

            if (existingCategory != null)
            {
                throw new CategoryServiceAlreadyExistsException();
            }

            // LA DATA DEL USUARIO SE TRANSFORME A UN TIPO CATEGORIA
            var categoryEntity = _mapper.Map<CategoriaServicio>(request);

            await _unitOfWork.Repository<CategoriaServicio>().AddAsync(categoryEntity);

            return _mapper.Map<CategoriaServicioVm>(categoryEntity);

        }
    }
}
