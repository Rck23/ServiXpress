using ServiXpress.Application.Models.ImageManagement;

namespace ServiXpress.Application.Contracts.Infrastructure
{
    public interface IManageImageService
    {
        // Método para cargar una imagen y obtener una respuesta relacionada con la imagen.
        // Se espera que las clases que implementen esta interfaz proporcionen una implementación de este método.
        Task<ImageResponse> UploadImage(ImageData imageStream);
    }
}
