using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ServiXpress.Application.Contracts.Identity;
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

    }
}
