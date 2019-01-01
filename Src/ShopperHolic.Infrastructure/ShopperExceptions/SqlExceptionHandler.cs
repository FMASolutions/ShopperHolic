using System.Data.SqlClient;
using System;
namespace ShopperHolic.Infrastructure.ShopperExceptions
{
    public static class SqlExceptionHandler
    {
        public static BaseCustomException HandleSqlException(Exception originalException)
        {
            try
            {
                SqlException SQLExcep = (SqlException)originalException;
                BaseCustomException returnException = null;
                switch (SQLExcep.Number)
                {
                    case 2627:
                        returnException = GetKeyAlreadyExistsException(originalException.Message);
                        break;
                    case 547:
                        returnException = GetChildRecordExistsException(originalException.Message);
                        break;
                    default: break;
                }
                return returnException;
            }
            catch (InvalidCastException)
            {
                try
                {
                    InvalidOperationException invOp = (InvalidOperationException)originalException;
                    BaseCustomException returnException = NoRecordsFoundException();
                    return returnException;
                }
                catch (InvalidCastException)
                {
                    throw originalException;
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