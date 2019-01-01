using System;
using System.Data;
using ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories;

namespace ShopperHolic.BusinessServices.ShopperHolicService
{
    public class UnitOfWork : IUnitOfWork
    {
        public UnitOfWork(string connectionString)
        {
            _dbConnection = ConnectionProvider.GetSQLConnection(connectionString);
            _dbConnection.Open();
            _transaction = _dbConnection.BeginTransaction();

            //When adding a new Repository Always remember to add it to the private "Reset" method @ the bottom
            _securityRepo = new SecurityRepo(_transaction);
            _productGroupRepo = new ProductGroupRepo(_transaction);
            _subGroupRepo = new SubGroupRepo(_transaction);
        }
        ~UnitOfWork()
        {
            dispose(_disposing);
        }
        private IDbConnection _dbConnection;
        private IDbTransaction _transaction;

        public ISecurityRepo SecurityRepo { get { return _securityRepo ?? (_securityRepo = new SecurityRepo(_transaction)); } }
        public IProductGroupRepo ProductGroupRepo { get { return _productGroupRepo ?? (_productGroupRepo = new ProductGroupRepo(_transaction)); } }
        public ISubGroupRepo SubGroupRepo {get { return _subGroupRepo ?? (_subGroupRepo = new SubGroupRepo(_transaction));}}
        
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
        public void RollbackChanges(bool createFollowUpTransaction = true)
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
            _productGroupRepo = null;
            _subGroupRepo = null;
        }
        private ISecurityRepo _securityRepo;
        private IProductGroupRepo _productGroupRepo;
        private ISubGroupRepo _subGroupRepo;
    }
}
