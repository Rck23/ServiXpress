namespace ServiXpress.Application.Models.Email
{
    public class EmailSettings
    {
        public string? Email { get; set; }
        public string? Key { get; set; }
        public string MailjetApiKey { get; set; }
        public string MailjetApiSecret { get; set; }
        public string? BaseUrlClient { get; set; }
    }
}
