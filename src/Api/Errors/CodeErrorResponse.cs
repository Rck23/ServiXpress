using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;

namespace ServiXpress.Api.Errors
{
    /// <summary>
    /// La clase CodeErrorResponse tiene dos propiedades: StatusCode de tipo int y Message de tipo string[] (opcional).
    /// Ambas propiedades están decoradas con el atributo [JsonProperty(PropertyName = "nombrePropiedad")], lo que indica que cuando 
    /// se serialice el objeto a JSON, los nombres de las propiedades en el JSON serán "statusCode" y "message" respectivamente.
    /// </summary>
    public class CodeErrorResponse
    {
        [JsonProperty(PropertyName = "statusCode")]
        public int StatusCode { get; set; }

        [JsonProperty(PropertyName = "message")]
        public string[]? Message { get; set; }

        /// <summary>
        /// El constructor CodeErrorResponse acepta dos parámetros: statusCode de tipo int y message de tipo string[] (opcional).
        /// El constructor asigna el valor de statusCode a la propiedad StatusCode. Si message es nulo, se crea un arreglo de cadenas 
        /// vacío y se obtiene un mensaje predeterminado basado en el código de estado utilizando el método GetDefaultMessageStatusCode().
        /// Si message no es nulo, se asigna directamente a la propiedad Message.
        /// </summary>
        /// <param name="statusCode"></param>
        /// <param name="message"></param>
        public CodeErrorResponse(int statusCode, string[]? message = null)
        {
            StatusCode = statusCode;
            if (message is null)
            {
                Message = new string[0];
                var text = GetDefaultMessageStatusCode(statusCode);
                Message = Message.Append(text).ToArray();
            }
            else
            {
                Message = message;
            }


        }


        /// <summary>
        /// El método privado GetDefaultMessageStatusCode() devuelve un mensaje predeterminado basado en el código de estado. 
        /// Utiliza una expresión switch para determinar el mensaje correspondiente según el valor de statusCode.
        /// </summary>
        /// <param name="statusCode"></param>
        /// <returns></returns>
        private string GetDefaultMessageStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "El Request enviado tiene errores",
                401 => "No tienes authorization para este recurso",
                404 => "No se encontro el recurso solicitado",
                500 => "Se produjeron errores en el servidor",
                _ => string.Empty
            };

        }
    }
}
