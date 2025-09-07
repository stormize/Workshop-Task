namespace ConsumerTransaction.Server.Dto.Transaction
{
    public class GetAllTransactionsDto
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int ConsumerId { get; set; }
    }
}
