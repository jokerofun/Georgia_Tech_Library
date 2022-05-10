﻿using Georgia_Tech_Library_API.LoggerService;
using Georgia_Tech_Library_API.Models;
using Microsoft.Data.SqlClient;
using System.Net;

namespace Georgia_Tech_Library_API.ExceptionMiddleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILoggerManager _logger;
        public ExceptionMiddleware(RequestDelegate next, ILoggerManager logger)
        {
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (SqlException ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                string message = "There was a problem with the database, please refresh the page and try again";
                HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError;
                await HandleExceptionAsync(httpContext, ex, message, httpStatusCode);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Something went wrong: {ex}");
                string message = "Something went wrong, please refresh the page and try again";
                HttpStatusCode httpStatusCode = HttpStatusCode.InternalServerError;
                await HandleExceptionAsync(httpContext, ex, message, httpStatusCode);
            }
        }
        private async Task HandleExceptionAsync(HttpContext context, Exception exception, string message, HttpStatusCode httpStatusCode)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)httpStatusCode;
            await context.Response.WriteAsync(new ErrorDetails()
            {
                StatusCode = context.Response.StatusCode,
                Message = message
            }.ToString());
        }
    }
}
