using System;
namespace ShopperHolic.Infrastructure.ShopperExceptions
{
    public class NoRecordsFoundException : BaseCustomException
    {
        internal NoRecordsFoundException() : base($"No record found") { }
    }
}