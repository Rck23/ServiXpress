using System;
using MediatR;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Domain;

namespace ServiXpress.Application.Features.Services.Commands.UpdateService
{
	public class UpdateService : IRequest<Servicio>
    {


        public int Id { get; set; }
        public string? Estado { get; set; }
        public string? Municipio { get; set; }
        public string? Telefonos { get; set; }
        public string? Correos { get; set; }
        public string? OtrosMediosContacto { get; set; }
        public string? Descripcion { get; set; }
        public string? UbicacionMaps { get; set; }
        public float Precio { get; set; }
        public int? CategoriaId { get; set; }

        public string? Tipo { get; set; }
    }
}

