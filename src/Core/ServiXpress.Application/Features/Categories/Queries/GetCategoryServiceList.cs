using System;
using MediatR;
using ServiXpress.Application.Features.Categories.ViewModels;

namespace ServiXpress.Application.Features.Categories.Queries
{
	public class GetCategoryServiceList : IRequest<IReadOnlyList<CategoriaServicioVm>>

    {
        
	}
}

