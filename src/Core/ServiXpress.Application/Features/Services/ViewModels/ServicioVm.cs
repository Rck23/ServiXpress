
namespace ServiXpress.Application.Features.Services.ViewModels
{
    public class ServicioVm
    {
        //public int Id { get; set; }
        public string Estado { get; set; }
        public string Municipio { get; set; }
        public string Telefonos { get; set; }
        public string Correos { get; set; }
        public string OtrosMediosContacto { get; set; }
        public string Descripcion { get; set; }
        public string UbicacionMaps { get; set; }
        public float Precio { get; set; }

        //public DateTime FechaHoraRegistro { get; set; }
        //public DateTime? FechaVencimiento { get; set; }

        //public string UsuarioId { get; set; }

        public string NombreCategoria { get; set; }
        public int CategoriaId { get; set; }

        public string? Tipo { get; set; }
    }
}
