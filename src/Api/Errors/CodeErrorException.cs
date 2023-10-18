using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Drawing;

namespace ServiXpress.Api.Errors
{
    public class CodeErrorException : CodeErrorResponse
    {
        /// <summary>
        /// La clase CodeErrorException hereda de CodeErrorResponse.
        /// La propiedad Details es de tipo string y está decorada con el atributo[JsonProperty(PropertyName = "details")].
        /// Esto indica que cuando se serialice el objeto a JSON, el nombre de la propiedad en el JSON será "details".
        /// El constructor CodeErrorException acepta tres parámetros: statusCode de tipo int, message de tipo string[] (opcional) 
        /// y details de tipo string (opcional). El constructor llama al constructor de la clase base CodeErrorResponse pasando el 
        /// statusCode y message. Luego, asigna el valor de details a la propiedad Details.
        /// </summary>
        
        [JsonProperty(PropertyName = "details")]
        public string? Details { get; set; }
        public CodeErrorException(int statusCode, string[] message = null, string? details = null)
                                : base(statusCode, message)
        {
            Details = details;
        }
    }
}
