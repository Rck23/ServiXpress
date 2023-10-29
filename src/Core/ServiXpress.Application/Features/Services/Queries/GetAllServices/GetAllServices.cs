using MediatR;
using ServiXpress.Application.Features.Services.ViewModels;

namespace ServiXpress.Application.Features.Services.Queries.GetAllServices
{
    public class GetAllServices : IRequest<IReadOnlyList<ServicioVm>>
    {
    }
}
