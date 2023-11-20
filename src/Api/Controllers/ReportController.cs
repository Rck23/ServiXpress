using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Application.Exceptions;
using ServiXpress.Application.Features.Reports.ViewModels;
using ServiXpress.Application.Models.Status;
using ServiXpress.Domain;
using ServiXpress.Infrastructure.Context;

namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {

        private readonly ServiXpressDbContext _context;
        private readonly UserManager<Usuario> _userManager;
        private readonly IAuthService _authService;
        private ILogger<ServicioController> _logger;

        public ReportController(ServiXpressDbContext context, 
            UserManager<Usuario> userManager, IAuthService authService,
            ILogger<ServicioController> logger)
        {
            _context = context;
            _userManager = userManager;
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("createReport", Name = "CreateReport")]
        public async Task<ActionResult<Reporte>> Create(ReportVm reporteVm)
        {
            _logger.LogInformation("Creando reporte");

            try
            {
                var UsuarioSession = await _userManager.FindByNameAsync(_authService.GetSessionUser());

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

               
                var reporte = new Reporte
                {
                    Descripcion = reporteVm.Descripcion,
                   // DescripcionAgente = reporteVm.DescripcionAgente,
                    FechaHoraRegistro = DateTime.Now,
                    UsuarioId = UsuarioSession.Id,
                    UsuarioReportarId = reporteVm.UsuarioReportarId,
                    FechaHoraCierre = DateTime.Now.AddMonths(2),
                    CategoriaId = reporteVm.CategoriaId,
                    Estatus = EstatusReporteAPI.Alta,
                    // AgenteCierraReporteId = reporteVm.AgenteCierraReporteId
                };

                _context.Reportes.Add(reporte);
                await _context.SaveChangesAsync();

                return Ok(reporte);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al crear reporte");
                throw new Exception("Error al crear reporte", ex);
            }
        }


        [AllowAnonymous]
        [HttpGet("getReportById/{id}", Name = "GetReportById")]
        public async Task<ActionResult<Reporte>> GetReportById(int id)
        {
            _logger.LogInformation("Obteniendo reporte por ID");

            try
            {
                var reporte = await _context.Reportes
                   .FirstOrDefaultAsync(s => s.Id == id);

                if (reporte != null)
                {
                    return Ok(reporte);
                }
                else
                {
                    throw new ReportNotFoundException();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener el reporte por ID");
                throw;
            }
        }


        [AllowAnonymous]
        [HttpGet("getAllReports", Name = "GetAllReports")]
        public async Task<ActionResult<IEnumerable<Reporte>>> GetAllReports()
        {
            _logger.LogInformation("Obteniendo todos los reportes");

            try
            {

                return await _context.Reportes
                    .ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al obtener los reportes");
                throw;
            }
        }



        [AllowAnonymous]
        [HttpGet("reportsByParameters", Name = "ReportsByParameters")]
        public async Task<ActionResult<List<Reporte>>> ReportsByParameters([FromQuery] string? descripcion, string? usuarioId,
            string? usuarioReportarId, string? estatus)
        {
            _logger.LogInformation("Obteniendo reporte(s) por parametro ");

            try
            {
                var reportes = await _context.Reportes
                    .Where(s => (descripcion == null || s.Descripcion == descripcion)
                        && (usuarioId == null || s.UsuarioId == usuarioId)
                        && (usuarioReportarId == null || s.UsuarioReportarId == usuarioReportarId)
                        && (estatus == null || s.Estatus == estatus))
                    .ToListAsync();

                if (reportes.Count == 0)
                {
                    return NotFound("No se encontro ningun reporte.");
                }

                return Ok(reportes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al buscar servicio");
                throw new ReportQueryFailedException(ex);
            }
        }

        [HttpPost("changeStatusReport", Name = "ChangeStatusReport")]
        public async Task<IActionResult> ChangeStatusReport([FromBody] ChangeStatusReport statusReport)
        {
            _logger.LogInformation("Cambiando estatus del reporte");

            try
            {
                var reporte = await _context.Reportes.FindAsync(statusReport.ReporteId);

                if (reporte != null)
                {
                    // Verificar si el nuevo estado es válido
                    if (string.Equals(statusReport.NuevoEstatus, EstatusReporteAPI.Revision, StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(statusReport.NuevoEstatus, EstatusReporteAPI.Cerrado, StringComparison.OrdinalIgnoreCase))
                    {
                        reporte.Estatus = statusReport.NuevoEstatus;
                        await _context.SaveChangesAsync();

                        return Ok(new { message = $"Se cambió el estatus del reporte a {statusReport.NuevoEstatus}" });
                    }
                    else
                    {
                        throw new StatusReportNotFound();
                    }
                }
                else
                {
                    throw new UserNotFoundException();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error en el metodo cambiar estatus de reporte");
                throw;
            }
        }

    }
}
