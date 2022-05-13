using Georgia_Tech_Library_API.Business;
using Georgia_Tech_Library_API.Business.Interfaces;
using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Repository;
using Microsoft.Data.SqlClient;
using Microsoft.SqlServer.Management.Common;
using Microsoft.SqlServer.Management.Smo;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json");

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("GeorgiaTechLibraryAPI");
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

if (app.Environment.EnvironmentName.Equals("Testing"))
{
    using SqlConnection conn = new(connectionString);
    var filePath = Path.GetDirectoryName(System.AppDomain.CurrentDomain.BaseDirectory);
    filePath = Directory.GetParent(Directory.GetParent(Directory.GetParent(filePath).FullName).FullName).FullName;
    filePath = Path.Combine(filePath, "DatabaseInitialize.sql");
    string script = File.ReadAllText(filePath);
    Server server = new(new ServerConnection(conn));
    server.ConnectionContext.ExecuteNonQuery(script);
}

app.MapGet("/error", () => Results.Problem("An error occured.", statusCode: 500)).ExcludeFromDescription();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

public partial class Program { }