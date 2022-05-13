  IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = 'GeorgiaTechLibraryTest')
  BEGIN
    CREATE DATABASE [GeorgiaTechLibraryTest]


    END
    GO
       USE [GeorgiaTechLibraryTest]
    GO
--You need to check if the table exists
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Library' and xtype='U')
BEGIN
    
CREATE TABLE Library
(
  Name VARCHAR(30) NOT NULL,
  Street VARCHAR(30) NOT NULL,
  City VARCHAR(20) NOT NULL,
  ZipCode VARCHAR(10) NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE Card
(
  CardNumber VARCHAR(20) NOT NULL,
  DateOfIssue DATE NOT NULL,
  ExpirationDay DATE NOT NULL,
  PRIMARY KEY (CardNumber)
);

CREATE TABLE Campus
(
  Name VARCHAR(25) NOT NULL,
  Street VARCHAR(30) NOT NULL,
  City VARCHAR(20) NOT NULL,
  ZipCode VARCHAR(10) NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE Role
(
  Name VARCHAR(15) NOT NULL,
  GracePeriod INT NOT NULL,
  ReturnPeriod INT NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE Subject
(
  Name VARCHAR(30) NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE Type
(
  Name VARCHAR(20) NOT NULL,
  Lendable BIT NOT NULL,
  PRIMARY KEY (Name)
);

CREATE TABLE Member
(
  SSN VARCHAR(20) NOT NULL,
  FirstName VARCHAR(25) NOT NULL,
  LastName VARCHAR(25) NOT NULL,
  Email VARCHAR(30) NOT NULL,
  Phone VARCHAR(15) NOT NULL,
  Street VARCHAR(30) NOT NULL,
  City VARCHAR(20) NOT NULL,
  ZipCode VARCHAR(10) NOT NULL,
  CampusName VARCHAR(25) NOT NULL,
  RoleName VARCHAR(15) NOT NULL,
  CardNumber VARCHAR(20) NOT NULL,

  PRIMARY KEY (SSN),
  FOREIGN KEY (CampusName) REFERENCES Campus(Name),
  FOREIGN KEY (RoleName) REFERENCES Role(Name),
  FOREIGN KEY (CardNumber) REFERENCES Card(CardNumber)

);

CREATE TABLE Item
(
  ISBN VARCHAR(13) NOT NULL,
  Title VARCHAR(30) NOT NULL,
  Publisher VARCHAR(30) NOT NULL,
  Edition VARCHAR(30) NOT NULL,
  DateOfPublishing DATE NOT NULL,
  Type VARCHAR(20) NOT NULL,
  PRIMARY KEY (ISBN),
  FOREIGN KEY (Type) REFERENCES Type(Name)
);

CREATE TABLE Author
(
  FirstName VARCHAR(30) NOT NULL,
  LastName VARCHAR(30) NOT NULL,
  ISBN VARCHAR(13) NOT NULL,
  PRIMARY KEY (FirstName, LastName, ISBN),
  FOREIGN KEY (ISBN) REFERENCES Item(ISBN)
);

CREATE TABLE ItemSubject
(
  ISBN VARCHAR(13) NOT NULL,
  SubjectName VARCHAR(30) NOT NULL,
  PRIMARY KEY (ISBN, SubjectName ),
  FOREIGN KEY (ISBN) REFERENCES Item(ISBN),
  FOREIGN KEY (SubjectName ) REFERENCES Subject(Name)
);

CREATE TABLE Catalog
(
  ISBN VARCHAR(13) NOT NULL,
  LibraryName VARCHAR(30) NOT NULL,
  TotalAmount INT NOT NULL,
  AvailableAmount INT NOT NULL,
  Description VARCHAR(5000) NOT NULL,
  PRIMARY KEY (ISBN, LibraryName),
  FOREIGN KEY (ISBN) REFERENCES Item(ISBN),
  FOREIGN KEY (LibraryName) REFERENCES Library(Name)
);

CREATE TABLE BorrowingActivity
(
  SSN VARCHAR(20) NOT NULL,
  ISBN VARCHAR(13) NOT NULL,
  LibraryName VARCHAR(30) NOT NULL,
  BorrowingDate DATE NOT NULL,
  DueDate DATE NOT NULL,
  DateOfReturn DATE,
  PRIMARY KEY (SSN, ISBN, LibraryName),
  FOREIGN KEY (SSN) REFERENCES Member(SSN),
  FOREIGN KEY (ISBN, LibraryName) REFERENCES Catalog(ISBN, LibraryName)
);

END