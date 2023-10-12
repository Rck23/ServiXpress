using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Features.Services.Commands.CreateService;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Domain;
using ServiXpress.Infrastructure.Context;
using System.Net;
using System.Security.Claims;


namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController : ControllerBase
    {

        private readonly ServiXpressDbContext _context;
        private readonly UserManager<Usuario> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IAuthService _authService;

        private IMediator _mediator;

        public ServicioController(IMediator mediator, ServiXpressDbContext context, UserManager<Usuario> userManager, RoleManager<IdentityRole> roleManager, IAuthService authService)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _authService = authService;

            _mediator = mediator;
        }

        [HttpPost]
        public async Task<ActionResult<Servicio>> Create(ServicioVm servicioVm)
        {
            var UsuarioSession = await _userManager.FindByNameAsync(_authService.GetSessionUser());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var servicio = new Servicio
            {
                Estado = servicioVm.Estado,
                Municipio = servicioVm.Municipio,
                Telefonos = servicioVm.Telefonos,
                Correos = servicioVm.Correos,
                OtrosMediosContacto = servicioVm.OtrosMediosContacto,
                Descripcion = servicioVm.Descripcion,
                UbicacionMaps = servicioVm.UbicacionMaps,
                Precio = servicioVm.Precio,
                FechaHoraRegistro = DateTime.Now, // establece la fecha y hora de registro al momento actual
                FechaVencimiento = DateTime.Now.AddMonths(1),
                UsuarioId = UsuarioSession.Id,
                CategoriaId = servicioVm.CategoriaId,
                Tipo = servicioVm.Tipo
            };

            _context.Servicios.Add(servicio);
            await _context.SaveChangesAsync();

            return Ok(servicio); // devuelve el objeto Servicio recién creado
        }



        [HttpPost("createHandler", Name = "CreateProduct")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<ActionResult<ServicioVm>> CreateProduct([FromForm] CreateService createProduct)
        {
            

            // ENVIAR AL HANDLER
            return await _mediator.Send(createProduct);
        }


    }
}
