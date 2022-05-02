using Microsoft.Data.SqlClient;
using System.ComponentModel.DataAnnotations;
using Dapper;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = builder.Configuration.GetConnectionString("GeorgiaTechLibraryAPI") ?? "Server=localhost;Database=GeorgiaTechLibrary";
builder.Services.AddScoped(_ => new SqlConnection(connectionString));
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

await EnsureDb(app.Services, app.Logger);

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

async Task EnsureDb(IServiceProvider services, ILogger logger)
{
    using var db = services.CreateScope().ServiceProvider.GetRequiredService<SqlConnection>();
    var sql =
    $@"CREATE TABLE IF NOT EXISTS Library
    (
      Name VARCHAR NOT NULL,
      Street VARCHAR NOT NULL,
      City VARCHAR NOT NULL,
      Zip_code VARCHAR NOT NULL,
      PRIMARY KEY (Name)
    );

    CREATE TABLE IF NOT EXISTS Campus
    (
      Name VARCHAR NOT NULL,
      Street VARCHAR NOT NULL,
      City VARCHAR NOT NULL,
      Zip_Code VARCHAR NOT NULL,
      PRIMARY KEY(Name)
    );

    CREATE TABLE IF NOT EXISTS Role
    (
      Name VARCHAR NOT NULL,
      Grace_period INT NOT NULL,
      Return_period INT NOT NULL,
      PRIMARY KEY(Name)
    );

    CREATE TABLE IF NOT EXISTS Subject
    (
      Name VARCHAR NOT NULL,
      PRIMARY KEY(Name)
    );

    CREATE TABLE IF NOT EXISTS ItemType
    (
      Type VARCHAR NOT NULL,
      Lendable VARCHAR NOT NULL,
      PRIMARY KEY(Type)
    );

    CREATE TABLE IF NOT EXISTS Member
    (
      SSN VARCHAR NOT NULL,
      First_Name VARCHAR NOT NULL,
      Last_Name VARCHAR NOT NULL,
      Email VARCHAR NOT NULL,
      Phone VARCHAR NOT NULL,
      Street VARCHAR NOT NULL,
      City VARCHAR NOT NULL,
      Zip_Code VARCHAR NOT NULL,
      Campus_Name VARCHAR NOT NULL,
      Role_Name VARCHAR NOT NULL,
      PRIMARY KEY(SSN),
      FOREIGN KEY(Campus_Name) REFERENCES Campus(Name),
      FOREIGN KEY(Role_Name) REFERENCES Role(Name)
    );

    CREATE TABLE IF NOT EXISTS Item
    (
      ISBN VARCHAR NOT NULL,
      Title VARCHAR NOT NULL,
      Publisher VARCHAR NOT NULL,
      Edition VARCHAR NOT NULL,
      Date_of_Publishing DATE NOT NULL,
      Type VARCHAR NOT NULL,
      PRIMARY KEY(ISBN),
      FOREIGN KEY(Type) REFERENCES ItemType(Type)
    );

    CREATE TABLE IF NOT EXISTS Author
    (
      First_Name VARCHAR NOT NULL,
      Last_Name VARCHAR NOT NULL,
      ISBN VARCHAR NOT NULL,
      PRIMARY KEY(First_Name, Last_Name, ISBN),
      FOREIGN KEY(ISBN) REFERENCES Item(ISBN)
    );

    CREATE TABLE IF NOT EXISTS ItemSubject
    (
      ISBN VARCHAR NOT NULL,
      Name VARCHAR NOT NULL,
      PRIMARY KEY(ISBN, Subject),
      FOREIGN KEY(ISBN) REFERENCES Item(ISBN),
      FOREIGN KEY(Name) REFERENCES Subject(Name)
    );

    CREATE TABLE IF NOT EXISTS Card
    (
      Card_Number VARCHAR NOT NULL,
      Expiration_day DATE NOT NULL,
      Date_of_Issue DATE NOT NULL,
      SSN VARCHAR NOT NULL,
      PRIMARY KEY(Card_Number),
      FOREIGN KEY(SSN) REFERENCES Member(SSN)
    );

    CREATE TABLE IF NOT EXISTS Catalog
    (
      ISBN VARCHAR NOT NULL,
      Library_Name VARCHAR NOT NULL,
      Total_Amount INT NOT NULL,
      Available_amount INT NOT NULL,
      Description VARCHAR NOT NULL,
      PRIMARY KEY(ISBN, Library_Name),
      FOREIGN KEY(ISBN) REFERENCES Item(ISBN),
      FOREIGN KEY(Library_Name) REFERENCES Library(Name)
    );

    CREATE TABLE IF NOT EXISTS Borrowing_Activity
    (
      SSN VARCHAR NOT NULL,
      ISBN VARCHAR NOT NULL,
      Library_Name VARCHAR NOT NULL,
      Borrowing_Date DATE NOT NULL,
      Due_Date DATE NOT NULL,
      Date_of_Return DATE,
      PRIMARY KEY(SSN, ISBN, Library_Name),
      FOREIGN KEY(SSN) REFERENCES Member(SSN),
      FOREIGN KEY(ISBN, Library_Name) REFERENCES Catalog(ISBN, Library_Name)
    );";

    await db.ExecuteAsync(sql);
}