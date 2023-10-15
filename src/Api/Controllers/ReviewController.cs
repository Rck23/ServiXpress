
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

        public ReviewController(IMediator mediator)
        {
          
            _mediator = mediator;
        }


        [HttpPost("create", Name = "CreateReviewii")]
        public async Task<ActionResult<ReviewVm>> CreateReview2([FromForm] CreateReviewUser createReview)
        {
            return await _mediator.Send(createReview);
        }

        
    }
}

