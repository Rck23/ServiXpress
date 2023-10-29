namespace ServiXpress.Domain
{
    public class Documento
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Ruta { get; set; }
        public DateTime FechaCreacion { get; set; }


        public string UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
