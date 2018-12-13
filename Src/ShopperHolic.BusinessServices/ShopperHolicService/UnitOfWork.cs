using System;
using System.Data;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories;

namespace ShopperHolic.BusinessServices.ShopperHolicService
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(string connectionString)
        {
            //_connectionFactory = new SQLFactoryStandard();
            _dbConnection = ConnectionProvider.GetSQLConnection(connectionString);
            _dbConnection.Open();
            _transaction = _dbConnection.BeginTransaction();

            //When adding a new Repository Always remember to add it to the private "Reset" method @ the bottom
            _securityRepo = new SecurityRepo(_transaction);
            
        }
        ~UnitOfWork()
        {
            dispose(false);
        }
        private IDbConnection _dbConnection;
        private IDbTransaction _transaction;
        //private SQLFactory _connectionFactory;

        public ISecurityRepo SecurityRepo { get { return _securityRepo ?? (_securityRepo = new SecurityRepo(_transaction)); } }
        
        bool _disposing = false;

        public void SaveChanges()
        {
            try
            {
                _transaction.Commit();
            }
            catch (Exception)
            {
                _transaction.Rollback();
                throw;
            }
            finally
            {
                _transaction.Dispose();
                _transaction = _dbConnection.BeginTransaction();
                ResetRepos();
            }
        }
        public void RollBack(bool createFollowUpTransaction = true)
        {
            _transaction.Rollback();
            if (createFollowUpTransaction)
                _transaction = _dbConnection.BeginTransaction();
        }
        public void Dispose()
        {
            dispose(true);
            GC.SuppressFinalize(this);
        }

        private void dispose(bool disposing)
        {
            if (!_disposing)
            {
                if (disposing)
                {
                    if (_transaction != null)
                    {
                        _transaction.Dispose();
                        _transaction = null;
                    }
                    if (_dbConnection != null)
                    {
                        _dbConnection.Dispose();
                        _dbConnection = null;
                    }
                }
                _disposing = true;
            }
        }


        private void ResetRepos()
        {
            _securityRepo = null;
        }
        private ISecurityRepo _securityRepo;
    }
}
