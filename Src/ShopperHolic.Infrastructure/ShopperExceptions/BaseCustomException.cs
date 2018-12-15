using System;
namespace ShopperHolic.Infrastructure.ShopperExceptions
{
    public abstract class BaseCustomException : Exception
    {
        public BaseCustomException(string message) : base(message) { }
    }
}