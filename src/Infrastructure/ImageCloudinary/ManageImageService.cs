using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using ServiXpress.Application.Contracts.Infrastructure;
using ServiXpress.Application.Models.ImageManagement;
using System.Net;

namespace ServiXpress.Infrastructure.ImageCloudinary
{
    public class ManageImageService : IManageImageService
    {
        // Propiedad para almacenar la configuración de Cloudinary
        public CloudinarySettings _cloudinarySettings { get; }

        // Constructor que recibe la configuración de Cloudinary
        public ManageImageService(IOptions<CloudinarySettings> cloudinarySettings)
        {
            _cloudinarySettings = cloudinarySettings.Value;
        }

        // Método para cargar una imagen en Cloudinary
        public async Task<ImageResponse> UploadImage(ImageData imageStream)
        {
            // Crear una cuenta de Cloudinary con la configuración proporcionada
            var account = new Account(
              _cloudinarySettings.CloudName,
              _cloudinarySettings.ApiKey,
              _cloudinarySettings.ApiSecret
            );
            // Crear una instancia de Cloudinary con la cuenta
            var cloudinary = new Cloudinary(account);

            // Parámetros de carga de la imagen
            var uploadImage = new ImageUploadParams()
            {
                File = new FileDescription(imageStream.Nombre, imageStream.ImageStream)
            };

            // Cargar la imagen en Cloudinary de forma asincrónica
            var uploadResult = await cloudinary.UploadAsync(uploadImage);

            // Verificar si la carga se realizó con éxito
            if (uploadResult.StatusCode == HttpStatusCode.OK)
            {
                // Devolver una respuesta con la información de la imagen cargada
                return new ImageResponse
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.Url.ToString()
                };
            }
            // En caso de error, lanzar una excepción
            throw new Exception("La imagen no se pudo guardar");
        }
        
    }
}
