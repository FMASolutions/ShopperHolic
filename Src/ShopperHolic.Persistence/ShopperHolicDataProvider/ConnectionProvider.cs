using System.Data;
using System.Data.SqlClient;
namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public static class ConnectionProvider
    {
        public static IDbConnection GetSQLConnection(string connectionString)
        {
            return new SqlConnection(connectionString);
        }
    }
}