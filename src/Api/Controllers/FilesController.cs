using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ServiXpress.Application.Contracts.Identity;
using ServiXpress.Domain;
using ServiXpress.Infrastructure.Context;
using ServiXpress.Application.Exceptions;


namespace ServiXpress.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilesController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly UserManager<Usuario> _userManager;
        private readonly ServiXpressDbContext _context;
        private ILogger<FilesController> _logger;


        public FilesController(IAuthService authService, ILogger<FilesController> logger, UserManager<Usuario> userManager, ServiXpressDbContext context)
        {
            _authService = authService;
            _userManager = userManager;
            _context = context;
            _logger = logger;
        }

        [HttpPost("uploadFile", Name = "UploadFile")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            _logger.LogInformation("Subiendo documento");

            try
            {

                if (file == null || file.Length == 0)
                {
                    throw new FileNotFound1Exception();
                }

                // Verificar el tamaño máximo del archivo 
                if (file.Length > 15 * 1024 * 1024) // 15 MB
                {
                    throw new FileSizeNotSupportException();
                }

                var UsuarioSession = await _userManager.FindByNameAsync(_authService.GetSessionUser());

                // Verificar el tipo de archivo permitido 
                if (!IsFileSupported(file.FileName))
                {
                    throw new FileNotSupportException();
                }

                // Guardar el archivo en la carpeta "Uploads" con el ID del usuario en el nombre del archivo
                var fileName = $"{UsuarioSession}--{file.FileName}";
                var filePath = Path.Combine("Uploads", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Guardar el dato del archivo y el ID del usuario en la base de datos
                var archivo = new Documento
                {
                    Nombre = file.FileName,
                    Ruta = filePath,
                    UsuarioId = UsuarioSession.Id,
                    FechaCreacion = DateTime.Now,
                };

                _context.Documentos.Add(archivo);
                await _context.SaveChangesAsync();



                // Retornar una respuesta adecuada
                return Ok("Archivo subido correctamente");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al subir documento");
                throw;

            }
        }

        private bool IsFileSupported(string fileName)
        {
            try
            {
                // Obtener la extensión del archivo
                var fileExtension = Path.GetExtension(fileName).ToLowerInvariant();

                // Verificar si la extensión pertenece a un documento de texto, presentación, hoja de cálculo o PDF
                var supportedExtensions = new[]
                {
                    // Documentos de texto
                    ".docx", ".doc", ".txt", ".rtf", ".odt", ".wpd",
                    // Presentaciones
                    ".pptx", ".ppt", ".odp", ".key",
                    // Hojas de cálculo
                    ".xlsx", ".xls", ".ods", ".numbers",
                    // Imágenes
                    ".jpg", ".jpeg", ".png", 
                    // PDF
                    ".pdf"
                };

                return supportedExtensions.Contains(fileExtension);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error al identificar el tipo de documento");
                throw;

            }
        }
    }
}
