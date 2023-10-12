using MediatR;

namespace ServiXpress.Application.Features.Auths.Users.Commands.SendPassword
{
    public class SendPassword : IRequest<string>
    {
        public string Email { get; set; }
    }
}
