using MediatR;
using ServiXpress.Application.Features.Services.ViewModels;

namespace ServiXpress.Application.Features.Services.Queries.GetServicesByParameters
{
    public class GetServicesByParameters : IRequest<List<ServicioVm>>
    {
        public string? Estado { get; set; }
        public string? Municipio { get; set; }
        public string? Correos { get; set; }
        public string? Descripcion { get; set; }
        public string? Tipo { get; set; }
        public string? Telefonos { get; set; }
        public float? Precio { get; set; }
    }
}
