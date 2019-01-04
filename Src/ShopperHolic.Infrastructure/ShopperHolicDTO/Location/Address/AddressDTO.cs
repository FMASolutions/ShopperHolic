namespace ShopperHolic.Infrastructure.ShopperHolicDTO
{
    public class AddressDTO
    {
        public int AddressID {get;set;}
        public string AddressLine1 {get; set;}
        public string AddressLine2 {get;set;}
        public string PostCode {get;set;}
        public int CityAreaID {get;set;}
        public string CityAreaText {get;set;}
    }
}