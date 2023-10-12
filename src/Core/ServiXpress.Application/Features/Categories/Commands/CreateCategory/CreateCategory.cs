using MediatR;
using ServiXpress.Application.Features.Categories.ViewModels;


namespace ServiXpress.Application.Features.Categories.Commands.CreateCategory
{
    public class CreateCategory : IRequest<CategoriaServicioVm>
    {


        public string Nombre { get; set; }
    }
}
