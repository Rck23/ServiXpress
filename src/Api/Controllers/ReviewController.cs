using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Reviews.Commands.CreateReviewService;
using ServiXpress.Application.Features.Reviews.ViewModels;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Domain;
using ServiXpress.Infrastructure.Context;
using ServiXpress.Infrastructure.Migrations;


namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ServiXpressDbContext _context;
        private readonly UserManager<Usuario> _userManager;
        private readonly IAuthService _authService;

        private IMediator _mediator;

        public ReviewController(IMediator mediator, ServiXpressDbContext context,
            UserManager<Usuario> userManager, IAuthService authService)
        {
            _context = context;
            _userManager = userManager;
            _authService = authService;

            _mediator = mediator;
        }


        [HttpPost("createHandler", Name = "CreateReviewii")]
        public async Task<ActionResult<ReviewVm>> CreateReview2([FromForm] CreateReviewUser createReview)
        {
            return await _mediator.Send(createReview);
        }

        [HttpPost("create", Name = "CreateReview")]
        public async Task<ActionResult<Calificacion>> CreateReview(ReviewVm reviewVm)
        {
            try
            {
                var UsuarioSession = await _userManager.FindByNameAsync(_authService.GetSessionUser());

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var calificado = await _context.Users.FirstOrDefaultAsync(u => u.Id == reviewVm.UsuarioCalificadoId);

                var review = new Calificacion
                {
                    CalificacionServicio = reviewVm.CalificacionUser,
                    Comentarios = reviewVm.Comentarios,
                    FechaHoraRegistro = DateTime.Now,
                    UsuarioCalificaId = UsuarioSession.Id,
                    UsuarioCalificadoId = calificado.Id

                };


            
                _context.Calificaciones.Add(review);
                await _context.SaveChangesAsync();

                return Ok(review);
            }
            catch (Exception ex)
            {
                throw new ServiceCreateFailedException(ex);
            }

        }
    }
}

