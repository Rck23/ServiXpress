using ServiXpress.Domain.Common;
using System.ComponentModel.DataAnnotations.Schema;


namespace ServiXpress.Domain
{
    public class Servicio 
    {
        public int Id { get; set; }
        public string Estado { get; set; }
        public string Municipio { get; set; }
        public string Telefonos { get; set; }
        public string Correos { get; set; }
        public string OtrosMediosContacto { get; set; }
        public string Descripcion { get; set; }
        public string UbicacionMaps { get; set; }
        public float Precio { get; set; }

        public DateTime FechaHoraRegistro { get; set; }
        public DateTime? FechaVencimiento { get; set; }

        [ForeignKey("Usuario")]
        public string UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        [ForeignKey("CategoriaServicio")]
        public int CategoriaId { get; set; }
        public CategoriaServicio CategoriaServicio { get; set; }

        [ForeignKey("TipoServicio")]
        public string Tipo { get; set; }
        public TipoServicio TipoServicio { get; set; }
    }
}
