using System.ComponentModel.DataAnnotations;


namespace ServiXpress.Domain
{
    public class CategoriaServicio 
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }

        [Required]
        public DateTime FechaHoraRegistro { get; set; }

    }
}
