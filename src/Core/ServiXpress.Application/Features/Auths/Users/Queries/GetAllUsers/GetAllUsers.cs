using MediatR;
using ServiXpress.Application.Features.Auths.Users.ViewModels;


namespace ServiXpress.Application.Features.Auths.Users.Queries.GetAllUsers
{
    public class GetAllUsers : IRequest<List<AuthResponse>>
    {
    }
}
