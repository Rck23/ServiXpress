
using MediatR;
using Microsoft.AspNetCore.Mvc;

using ServiXpress.Application.Features.Reviews.Commands.CreateReviewService;
using ServiXpress.Application.Features.Reviews.ViewModels;



namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
       

        private IMediator _mediator;
        private ILogger<ReviewController> _logger;

        public ReviewController(IMediator mediator, ILogger<ReviewController> logger)
        {


            _logger = logger;
            _mediator = mediator;
        }


        [HttpPost("create", Name = "CreateReviewii")]
        public async Task<ActionResult<ReviewVm>> CreateReview([FromForm] CreateReviewUser createReview)
        {
            _logger.LogInformation("Creando calificacion a usuario");

            try
            {
                return await _mediator.Send(createReview);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al calificar usuario");
                throw;

            }
        }

        
    }
}

