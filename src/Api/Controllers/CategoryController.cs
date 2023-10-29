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
        private ILogger<CategoryController> _logger;


        public CategoryController(IMediator mediator, ILogger<CategoryController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }


        [AllowAnonymous]
        [HttpGet("GetCategoriesServices", Name = "GetCategoriesServices")]
        public async Task<ActionResult<IReadOnlyList<CategoriaServicioVm>>> GetCategoriesServices()
        {
            _logger.LogInformation("Obteniendo las categorias de servicio");

            try
            {
                var query = new GetCategoryServiceList();


                return Ok(await _mediator.Send(query));

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener las categorias de servicio");
                throw;
            }
        }

        [AllowAnonymous]
        [HttpPost("createCategoryServices", Name = "CreateCategoryServices")]
        public async Task<ActionResult<CategoriaServicioVm>> CreateCategoryServices([FromForm] CreateCategoryService createCategory)
        {
            _logger.LogInformation("Creando categoria de servicio");

            try
            {

                return await _mediator.Send(createCategory);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear una categoria de servicio");
                throw;
            }
        }
    }
}
