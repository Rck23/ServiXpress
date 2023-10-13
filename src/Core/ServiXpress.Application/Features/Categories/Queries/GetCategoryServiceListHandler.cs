using System;
using AutoMapper;
using MediatR;
using ServiXpress.Application.Features.Categories.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Categories.Queries
{
	public class GetCategoryServiceListHandler : IRequestHandler<GetCategoryServiceList, IReadOnlyList<CategoriaServicioVm>>
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetCategoryServiceListHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }



        public async Task<IReadOnlyList<CategoriaServicioVm>> Handle(GetCategoryServiceList request, CancellationToken cancellationToken)
        {
            // LISTA DE CATEGORIAS
            var categories = await _unitOfWork.Repository<CategoriaServicio>().GetAsync(
                null,
                x => x.OrderBy(y => y.Nombre),
                string.Empty,
                false
            );

            // CONVIRTIENDO A Category EN CategoryVm
            return _mapper.Map<IReadOnlyList<CategoriaServicioVm>>(categories);
        }
    }
}

