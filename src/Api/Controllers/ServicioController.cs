using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Services.Queries.GetAllServices;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Application.Models.Status;
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
        private ILogger<ServicioController> _logger;


        private IMediator _mediator;

        public ServicioController(IMediator mediator, ServiXpressDbContext context,
            UserManager<Usuario> userManager, IAuthService authService, ILogger<ServicioController> logger)
        {
            _context = context;
            _userManager = userManager;
            _authService = authService;
            _logger = logger;
            _mediator = mediator;
        }


        [HttpPost("create", Name = "CreateService")]
        public async Task<ActionResult<Servicio>> Create(ServicioVm servicioVm)
        {
            _logger.LogInformation("Creando servicio");

            try
            {
                var UsuarioSession = await _userManager.FindByNameAsync(_authService.GetSessionUser());

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var categoria = await _context.CategoriasServicios
                     .SingleOrDefaultAsync(c => c.Nombre == servicioVm.NombreCategoria);

                if (categoria == null)
                {
                    return NotFound("La categoría no fue encontrada.");
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
                    CategoriaId = categoria.Id,
                    Tipo = servicioVm.Tipo
                };

                _context.Servicios.Add(servicio);
                await _context.SaveChangesAsync();

                return Ok(servicio);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear servicio");
                throw new ServiceCreateFailedException(ex);

            }

        }



        [HttpPut("update/{id}", Name = "UpdateService")]
        public async Task<ActionResult<Servicio>> Update(int id, ServicioVm servicioVm)
        {
            _logger.LogInformation("Actulizando servicio");

            try
            {
                // Obtén el servicio existente de la base de datos usando el id proporcionado
                var servicio = await _context.Servicios.FindAsync(id);

                if (servicio == null)
                {
                    throw new ServiceNotFoundException(); // Devuelve un error si el servicio no existe
                }


                var categoria = await _context.CategoriasServicios
                    .SingleOrDefaultAsync(c => c.Nombre == servicioVm.NombreCategoria);

                if (categoria == null)
                {
                    return NotFound("La categoría no fue encontrada.");
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
                servicio.CategoriaId = categoria.Id;
                servicio.Tipo = servicioVm.Tipo;

                _context.Servicios.Update(servicio);
                await _context.SaveChangesAsync();

                return Ok(servicio);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al actualizar servicio");
                throw new ServiceUpdateFailedException(ex);
            }
        }

        [AllowAnonymous]
        [HttpGet("getServiceById/{id}", Name = "GetServiceById")]
        public async Task<ActionResult<Servicio>> GetServiceById(int id)
        {
            _logger.LogInformation("Obteniendo servicio por ID");

            try
            {
                var servicio = await _context.Servicios
                    .Include(s => s.Usuario)
                    .Include(c => c.CategoriaServicio)
                    .Include(t => t.TipoServicio)
                    .FirstOrDefaultAsync(s => s.Id == id);

                if (servicio != null)
                {
                    return Ok(servicio);
                }
                else
                {
                    throw new ServiceNotFoundException();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el servicio por ID");
                throw;
            }
        }


        [AllowAnonymous]
        [HttpGet("getAllServices", Name = "GetAllServices")]
        public async Task<ActionResult<IEnumerable<Servicio>>> GetAllServices()
        {
            _logger.LogInformation("Obteniendo todos los servicios");

            try
            {

                return await _context.Servicios
                    .Include(s => s.Usuario)
                    .Include(c => c.CategoriaServicio)
                    .Include(t => t.TipoServicio)
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener los servicios");
                throw;
            }
        }


        [AllowAnonymous]
        [HttpGet("servicesByParameters", Name = "GetServicesByParameters")]
        public async Task<ActionResult<List<Servicio>>> GetServicesByParameters([FromQuery] string text)
        {
            _logger.LogInformation("Obteniendo servicio(s) por parametro ");

            try
            {
                if (string.IsNullOrEmpty(text)) return Ok(new List<Servicio>());

                text = text.Trim().ToLower();

                var servicios = await _context.Servicios
                    .Include(x => x.Usuario)
                    .Include(x => x.TipoServicio)
                    .Include(x => x.CategoriaServicio)
                    .Where(s =>
                        s.Estado.ToLower().Contains(text)
                        || s.Municipio.ToLower().Contains(text)
                        || s.Descripcion.ToLower().Contains(text)
                        || s.Tipo.ToLower().Contains(text)
                        || s.Usuario.Nombre.ToLower().Contains(text)
                        || s.CategoriaServicio.Nombre.ToLower().Contains(text)
                ).ToListAsync();

                return Ok(servicios);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al buscar servicio");
                throw new ServiceQueryFailedException(ex);
            }
        }

    }
}
