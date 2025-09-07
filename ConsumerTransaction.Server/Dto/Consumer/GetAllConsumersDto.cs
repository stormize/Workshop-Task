using System.ComponentModel.DataAnnotations;

namespace ConsumerTransaction.Server.Dto.Consumer
{
    public class GetAllConsumersDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
    }
}
