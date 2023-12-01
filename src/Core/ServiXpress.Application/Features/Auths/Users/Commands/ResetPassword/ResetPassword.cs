using MediatR;

namespace ServiXpress.Application.Features.Auths.Users.Commands.ResetPassword
{
    public class ResetPassword : IRequest
    {
        public string? NewPassword { get; set; }
        public string? ConfirmPassword { get; set; }
        public string? UserId { get; set; }

    }
}
