using MediatR;
using ServiXpress.Application.Features.Auths.Users.ViewModels;


namespace ServiXpress.Application.Features.Auths.Users.Queries.GetUserById
{
    public class GetUserById : IRequest<AuthResponse>
    {
        public string? UserId { get; set; }

        public GetUserById(string userId)
        {
            //VALIDAR ID SEA REAL
            UserId = userId ?? throw new ArgumentNullException(nameof(userId));
        }
    }
}
