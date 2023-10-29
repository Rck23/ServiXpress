using AutoMapper;
using MediatR;
using ServiXpress.Application.Features.Services.ViewModels;
using ServiXpress.Application.Persistence;
using ServiXpress.Domain;
using System.Linq.Expressions;

namespace ServiXpress.Application.Features.Services.Queries.GetServicesByParameters
{
    public class GetServicesByParametersHandler : IRequestHandler<GetServicesByParameters, IReadOnlyList<ServicioVm>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetServicesByParametersHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IReadOnlyList<ServicioVm>> Handle(GetServicesByParameters request, CancellationToken cancellationToken)
        {
            // Parámetros de búsqueda
            string estado = request.Estado; // Estado del producto
            string municipio = request.Municipio; // Municipio del producto
            string correos = request.Correos; // Correos relacionados al producto
            string descripcion = request.Descripcion; // Descripción del producto
            string tipo = request.Tipo; // Tipo del producto (ofertado o requerido)
            string telefonos = request.Telefonos; // Teléfonos relacionados al producto
            float precio = (float)request.Precio; // Precio del producto

            // Construir la expresión de búsqueda
            Expression<Func<Servicio, bool>> filter = x =>
                (string.IsNullOrEmpty(estado) || x.Estado == estado) &&
                (string.IsNullOrEmpty(municipio) || x.Municipio == municipio) &&
                (string.IsNullOrEmpty(correos) || x.Correos.Contains(correos)) &&
                (string.IsNullOrEmpty(descripcion) || x.Descripcion.Contains(descripcion)) &&
                (string.IsNullOrEmpty(tipo) || x.Tipo == tipo) &&
                (string.IsNullOrEmpty(telefonos) || x.Telefonos.Contains(telefonos)) &&
                (precio == 0 || x.Precio == precio);


            // Obtener los productos que cumplen con los criterios de búsqueda
            var productos = await _unitOfWork.Repository<Servicio>().GetAsync(
                filter,
                x => x.OrderBy(y => y.Usuario),
                string.Empty,
                false
            );

            return _mapper.Map<IReadOnlyList<ServicioVm>>(productos);
        }
    }
}
