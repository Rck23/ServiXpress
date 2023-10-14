using MediatR;
using Microsoft.AspNetCore.Identity;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Auths.Users.Commands.ResetPassword
{
    public class ResetPasswordHandler : IRequestHandler<ResetPassword>
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly IAuthService _authService;

        public ResetPasswordHandler(UserManager<Usuario> userManager, IAuthService authService)
        {
            _userManager = userManager;
            _authService = authService;
        }

        public async Task<Unit> Handle(ResetPassword request, CancellationToken cancellationToken)
        {
            // VALIDAR USUARIO
            var updateUsuario = await _userManager.FindByNameAsync(_authService.GetSessionUser());

            if (updateUsuario is null)
            {
                throw new UserNotFoundException();
            }


            // VALIDAR LA CONTRASEÑA ANTIGUA
            var resultValidateOldPassword = _userManager.PasswordHasher
                .VerifyHashedPassword(updateUsuario, updateUsuario.PasswordHash!, request.OldPassword!);

            if (!(resultValidateOldPassword == PasswordVerificationResult.Success))
            {
                throw new IncorrectPasswordException();
            }

            // ENCRIPTAR LA NUEVA CONTRASEÑA
            var hashedNewPassword = _userManager.PasswordHasher.HashPassword(updateUsuario, request.NewPassword!);
            updateUsuario.PasswordHash = hashedNewPassword;

            //ACTUALIZAR EL USUARIO
            var resultado = await _userManager.UpdateAsync(updateUsuario);

            if (!resultado.Succeeded)
            {
                throw new PasswordChangeException();
            }

            return Unit.Value;
        }
    }
}
