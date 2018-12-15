using System;
namespace ShopperHolic.Infrastructure.ShopperExceptions
{
    public class KeyAlreadyExists : BaseCustomException
    {
        internal KeyAlreadyExists(string keyValue) : base($"Value {keyValue} already exists and must be unique") { }
    }
}