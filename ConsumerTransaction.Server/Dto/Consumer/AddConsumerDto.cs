using System.ComponentModel.DataAnnotations;

namespace ConsumerTransaction.Server.Dto.Consumer
{
    public class AddConsumerDto
    {
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
    }
}
