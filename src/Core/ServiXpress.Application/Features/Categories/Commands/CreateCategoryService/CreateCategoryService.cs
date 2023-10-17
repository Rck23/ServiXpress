using MediatR;
using ServiXpress.Application.Features.Categories.ViewModels;


namespace ServiXpress.Application.Features.Categories.Commands.CreateCategoryService
{
    public class CreateCategoryService : IRequest<CategoriaServicioVm>
    {


        public string Nombre { get; set; }
    }
}
