
namespace ShopperHolic.Infrastructure.ShopperExceptions
{
    public static class SqlExceptionHandler
    {
        public static BaseCustomException HandleSqlException(System.Exception ex)
        {
            try
            {

                System.Data.SqlClient.SqlException SQLExcep = (System.Data.SqlClient.SqlException)ex;

                BaseCustomException returnException = null;
                switch (SQLExcep.Number)
                {
                    case 2627:
                        returnException = GetKeyAlreadyExistsException(ex.Message);
                        break;
                    case 547:
                        returnException = GetChildRecordExistsException(ex.Message);
                        break;
                    default: break;
                }
                if (returnException != null) { throw returnException; }
                else { throw ex; }
            }
            catch (System.InvalidCastException)
            {
                try
                {
                    System.InvalidOperationException invOp = (System.InvalidOperationException)ex;
                    BaseCustomException returnException = NoRecordsFoundException();
                    return returnException;
                }
                catch (System.InvalidCastException)
                {
                    throw ex;
                }
            }
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

        private static BaseCustomException GetChildRecordExistsException(string originalErrorMessage)
        {
            string locatorText = "table \"dbo.";
            string terminatorText = "\"";
            int startIndex = originalErrorMessage.IndexOf(locatorText);
            originalErrorMessage = originalErrorMessage.Substring(startIndex + locatorText.Length);
            int endIndex = originalErrorMessage.IndexOf(terminatorText);
            string childTableName = originalErrorMessage.Substring(0, endIndex);
            return new ChildRecordExists(childTableName);
        }

        private static BaseCustomException NoRecordsFoundException()
        {
            return new NoRecordsFoundException();
        }
    }
}