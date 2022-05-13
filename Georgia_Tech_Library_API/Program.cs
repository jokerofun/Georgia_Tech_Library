using Georgia_Tech_Library_API.Business;
using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("GeorgiaTechLibraryAPI") ?? "Server=localhost;Database=GeorgiaTechLibrary";
builder.Services.AddSingleton<IDbConnectionFactory, DbConnectionFactory>(factory => new DbConnectionFactory(connectionString));
builder.Services.AddTransient<ICardRepository, CardRepository>();
builder.Services.AddTransient<ICardManagement, CardManagement>();
builder.Services.AddTransient<IItemRepository, ItemRepository>();
builder.Services.AddTransient<IItemManagement, ItemManagement>();
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
}

app.MapGet("/error", () => Results.Problem("An error occured.", statusCode: 500)).ExcludeFromDescription();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();