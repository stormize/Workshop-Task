using ConsumerTransaction.Server.Dto.Transaction;

namespace ConsumerTransaction.Server.Dto.Consumer
{
    public class GetConsumerWithTransactionsDto: GetAllConsumersDto
    {
        public List<GetAllTransactionsDto> Transactions { get; set; }
    }
}
