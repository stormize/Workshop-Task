
using Microsoft.EntityFrameworkCore;

namespace ConsumerTransaction.Server.Domain
{
    public class ConsumerTransactionDbContext:DbContext
    {
        public ConsumerTransactionDbContext(DbContextOptions option):base(option)
        {
                
        }
       public DbSet<Consumer> Consumers { get; set; }

       public DbSet<Transaction> Transactions {  get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Consumer>().HasMany(c => c.Transactions).WithOne(t => t.Consumer).HasForeignKey(t => t.FkConsumerId);

        }
    }
}
