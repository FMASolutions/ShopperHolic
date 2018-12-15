
namespace ShopperHolic.Infrastructure.ShopperExceptions
{
    public static class SqlExceptionHandler
    {
        public static BaseCustomException Handle(System.Data.SqlClient.SqlException ex)
        {
            BaseCustomException returnException = null;
            switch (ex.Number)
            {
                case 2627:
                    returnException = GetKeyAlreadyExistsException(ex.Message);
                    break;
                default: break;
            }
            return returnException;
        }

        private static BaseCustomException GetKeyAlreadyExistsException(string originalErrorMessage)
        {
            string locatorText = "The duplicate key value is (";
            string terminatorText = ")";
            int startIndex = originalErrorMessage.IndexOf(locatorText);
            originalErrorMessage = originalErrorMessage.Substring(startIndex + locatorText.Length);
            int endIndex = originalErrorMessage.LastIndexOf(terminatorText);
            string duplicateValue = originalErrorMessage.Substring(0, endIndex);
            return new KeyAlreadyExists(duplicateValue);
        }
    }
}