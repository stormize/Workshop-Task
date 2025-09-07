using ConsumerTransaction.Server.Domain;
using ConsumerTransaction.Server.Dto.Consumer;
using ConsumerTransaction.Server.Dto.Transaction;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:54659")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ConsumerTransactionDbContext>(opt => opt.UseInMemoryDatabase("ConsumerTransaction"));
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");


app.MapPost("/consumers", async (AddConsumerDto addConsumerDto, ConsumerTransactionDbContext db) =>
{
    var consumerExist = db.Consumers.Any(x => x.Email == addConsumerDto.Email.Trim() || x.FullName == addConsumerDto.FullName.Trim());
    if (consumerExist)
        return Results.Conflict("consumer with same data exist");
    Consumer consumer = new Consumer
    {
        Email = addConsumerDto.Email,
        FullName = addConsumerDto.FullName,
    };

    await db.Consumers.AddAsync(consumer);
    await db.SaveChangesAsync();
    return Results.Created($"/consumers/{consumer.Id}", consumer);
});

app.MapPost("/transactions", async (AddTransactionDto  addTransactionDto, ConsumerTransactionDbContext db) =>
{
    var consumerExist = db.Consumers.Any(x => x.Id == addTransactionDto.ConsumerId);
    if (!consumerExist)
        return Results.NotFound("consumer not found");

    Transaction transaction = new Transaction
    {
        Amount = addTransactionDto.Amount,
        FkConsumerId = addTransactionDto.ConsumerId,

    };

    await db.Transactions.AddAsync(transaction);
    await db.SaveChangesAsync();
    return Results.Created($"/transactions/{transaction.Id}", transaction);
});

app.MapGet("/consumers", async (ConsumerTransactionDbContext db) =>
{
   var res =  db.Consumers.Select(x => new GetAllConsumersDto
    {
         Id = x.Id,
         Email = x.Email,
         FullName = x.FullName,
    }).ToList();
    return Results.Ok(res);
});

app.MapGet("/transactions", async (ConsumerTransactionDbContext db) =>
{
    var res = db.Transactions.Select(x => new GetAllTransactionsDto
    {
        Id = x.Id,
        Amount = x.Amount,
        ConsumerId = x.FkConsumerId
    }).ToList();

    return Results.Ok(res);
});

app.MapGet("/consumers/{id}", async (int id , ConsumerTransactionDbContext db) =>
{

    var res = await db.Consumers.Include(c => c.Transactions).Select(x => new GetConsumerWithTransactionsDto
    {
        Id = x.Id,
        Email = x.Email,
        FullName = x.FullName,
        Transactions = x.Transactions.Select(t => new GetAllTransactionsDto { Id = t.Id, Amount = t.Amount, ConsumerId = t.FkConsumerId }).ToList()
    }).FirstOrDefaultAsync(c => c.Id == id);

    if (res == null)
        return Results.NotFound("consumer not found");

    return Results.Ok(res);
});

app.Run();
