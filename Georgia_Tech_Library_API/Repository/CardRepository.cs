﻿using Dapper;
using Georgia_Tech_Library_API.Helpers;
using Georgia_Tech_Library_API.Models;

namespace Georgia_Tech_Library_API.Repository
{
    public class CardRepository : ICardRepository
    {
        private IDbConnectionFactory _dbConnectionFactory;
        public CardRepository(IDbConnectionFactory dbConnectionFactory)
        {
            _dbConnectionFactory = dbConnectionFactory;
        }

        public Task<bool> Delete(Card obj)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Card>> GetAll()
        {
            var sql = "SELECT CardNumber, DateOfIssue, ExpirationDay FROM Card";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.QueryAsync<Card>(sql);
            return result.ToList();
        }

        public Task<Card> GetCardByCardNumber(string cardNumber)
        {
            throw new NotImplementedException();
        }

        public async Task<Card> Insert(Card obj)
        {
            var sql = "insert into Card values (7, '20221110', '20220302');";

            using var connection = _dbConnectionFactory.CreateSqlConnection();
            connection.Open();
            var result = await connection.ExecuteAsync(sql);
            return obj;
        }

        public Task<Card> Update(Card obj)
        {
            throw new NotImplementedException();
        }
    }
}