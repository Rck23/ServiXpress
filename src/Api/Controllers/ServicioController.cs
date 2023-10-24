using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Services.Queries.GetAllServices;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Domain;
using ServiXpress.Infrastructure.Context;



namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServicioController : ControllerBase
    {

        private readonly ServiXpressDbContext _context;
        private readonly UserManager<Usuario> _userManager;
        private readonly IAuthService _authService;

        private IMediator _mediator;

        public ServicioController(IMediator mediator, ServiXpressDbContext context,
            UserManager<Usuario> userManager, IAuthService authService)
        {
            _context = context;
            _userManager = userManager;
            _authService = authService;

            _mediator = mediator;
        }

        
        [HttpPost("create", Name = "CreateService")]
        public async Task<ActionResult<Servicio>> Create(ServicioVm servicioVm)
        {
            try
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
                    FechaHoraRegistro = DateTime.Now,
                    FechaVencimiento = DateTime.Now.AddMonths(1),
                    UsuarioId = UsuarioSession.Id,
                    CategoriaId = servicioVm.CategoriaId,
                    Tipo = servicioVm.Tipo
                };

                _context.Servicios.Add(servicio);
                await _context.SaveChangesAsync();

                return Ok(servicio);
            }
            catch (Exception ex)
            {
                throw new ServiceCreateFailedException(ex);
            }
            
        }



        [HttpPut("update/{id}", Name = "UpdateService")]
        public async Task<ActionResult<Servicio>> Update(int id, ServicioVm servicioVm)
        {
            try
            {
                // Obtén el servicio existente de la base de datos usando el id proporcionado
                var servicio = await _context.Servicios.FindAsync(id);

                if (servicio == null)
                {
                    throw new ServiceNotFoundException(); // Devuelve un error si el servicio no existe
                }

                // Actualiza las propiedades del servicio con los valores proporcionados en servicioVm
                servicio.Estado = servicioVm.Estado;
                servicio.Municipio = servicioVm.Municipio;
                servicio.Telefonos = servicioVm.Telefonos;
                servicio.Correos = servicioVm.Correos;
                servicio.OtrosMediosContacto = servicioVm.OtrosMediosContacto;
                servicio.Descripcion = servicioVm.Descripcion;
                servicio.UbicacionMaps = servicioVm.UbicacionMaps;
                servicio.Precio = servicioVm.Precio;
                servicio.FechaHoraRegistro = DateTime.Now;
                servicio.FechaVencimiento = DateTime.Now.AddMonths(1);
                servicio.CategoriaId = servicioVm.CategoriaId;
                servicio.Tipo = servicioVm.Tipo;

                _context.Servicios.Update(servicio);
                await _context.SaveChangesAsync();

                return Ok(servicio);
            }
            catch (Exception ex)
            {
                throw new ServiceUpdateFailedException(ex);
            }
        }



        [AllowAnonymous]
        [HttpGet("GetAllServices", Name = "GetAllServices")]
        public async Task<ActionResult<IReadOnlyList<ServicioVm>>> GetAllServices()
        {
            var query = new GetAllServices();


            return Ok(await _mediator.Send(query));
        }



        [AllowAnonymous]
        [HttpGet("servicesByParameters", Name = "GetServicesByParameters")]
        public async Task<ActionResult<List<Servicio>>> GetServicesByParameters([FromQuery] string? estado, string? municipio,
            string? correos, string? descripcion, string? tipo, string? telefonos, float? precio)
        {
            try
            {
                var servicios = await _context.Servicios
                    .Where(s => (estado == null || s.Estado == estado)
                        && (municipio == null || s.Municipio == municipio)
                        && (correos == null || s.Correos == correos)
                        && (descripcion == null || s.Descripcion == descripcion)
                        && (tipo == null || s.Tipo == tipo)
                        && (telefonos == null || s.Telefonos == telefonos)
                        && (precio == null || s.Precio == precio))
                    .ToListAsync();

                if (servicios.Count == 0)
                {
                    return NotFound("No se encontro ningun servicio.");
                }

                return Ok(servicios);
            }
            catch (Exception ex)
            {
                throw new ServiceQueryFailedException(ex);
            }
        }

    }
}
