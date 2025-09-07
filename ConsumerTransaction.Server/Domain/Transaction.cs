namespace ConsumerTransaction.Server.Domain
{
    public class Transaction
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public int FkConsumerId { get; set; }
        public Consumer Consumer { get; set; } = null!;

    }
}
