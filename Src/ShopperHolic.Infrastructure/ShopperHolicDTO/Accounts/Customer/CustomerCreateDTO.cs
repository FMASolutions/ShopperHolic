namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class CustomerCreateDTO
    {
        public int CustomerTypeID {get;set;}
        public int DefaultAddressID {get;set;}
        public string CustomerCode {get;set;}
        public string CustomerName {get;set;}
        public string CustomerContactNumber {get;set;}
        public string CustomerEmailAddress {get;set;}
    }
}