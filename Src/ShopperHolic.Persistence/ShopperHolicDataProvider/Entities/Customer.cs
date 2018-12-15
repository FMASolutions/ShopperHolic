using System;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Entities
{
    public class Customer
    {
        public Customer()
        {

        }
        public Customer(Int32 customerID, Int32 customerTypeID, Int32 defaultAddressID, string customerCode, string customerName, string customerContactNumber, string customerEmailAddress)
        {
            CustomerID = customerID;
            CustomerTypeID = customerTypeID;
            DefaultAddressID = defaultAddressID;
            CustomerCode = customerCode;
            CustomerName = customerName;
            CustomerContactNumber = customerContactNumber;
            CustomerEmailAddress = customerEmailAddress;
        }
        public Int32 CustomerID { get; internal set; }
        public Int32 CustomerTypeID { get; set; }
        public Int32 DefaultAddressID { get; set; }
        public string CustomerContactNumber { get; set; }
        public string CustomerEmailAddress { get; set; }
        public string CustomerName { get; set; }
        public string CustomerCode { get; set; }
    }
}