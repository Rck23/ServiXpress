using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ServiXpress.Application.Features.Categories.Commands.CreateCategoryService;
using ServiXpress.Application.Features.Categories.Queries;
using ServiXpress.Application.Features.Categories.ViewModels;
using System.Net;

namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private IMediator _mediator;

        public CategoryController(IMediator mediator)
        {
            _mediator = mediator;
        }


        [AllowAnonymous]
        [HttpGet("GetCategoriesServices", Name = "GetCategoriesServices")]
        public async Task<ActionResult<IReadOnlyList<CategoriaServicioVm>>> GetCategoriesServices()
        {
            var query = new GetCategoryServiceList();


            return Ok(await _mediator.Send(query));
        }

        [AllowAnonymous]
        [HttpPost("createCategoryServices", Name = "CreateCategoryServices")]
        public async Task<ActionResult<CategoriaServicioVm>> CreateCategoryServices([FromForm] CreateCategoryService createCategory)
        {
            
            return await _mediator.Send(createCategory);
        }
    }
}
