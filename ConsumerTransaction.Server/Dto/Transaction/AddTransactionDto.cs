namespace ConsumerTransaction.Server.Dto.Transaction
{
    public class AddTransactionDto
    {
        public decimal Amount { get; set; }
        public int ConsumerId { get; set; }
    }
}
