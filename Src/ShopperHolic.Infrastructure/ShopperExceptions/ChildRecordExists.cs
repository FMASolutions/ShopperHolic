using System;
namespace ShopperHolic.Infrastructure.ShopperExceptions
{
    public class ChildRecordExists : BaseCustomException
    {
        internal ChildRecordExists(string keyValue) : base($"Can't delete while record(s) for {keyValue} exist") { }
    }
}