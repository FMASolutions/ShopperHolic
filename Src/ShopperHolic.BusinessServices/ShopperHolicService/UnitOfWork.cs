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
        }
        ~UnitOfWork()
        {
            dispose(_disposing);
        }
        private IDbConnection _dbConnection;
        private IDbTransaction _transaction;

        public ISecurityRepo SecurityRepo { get { return _securityRepo ?? (_securityRepo = new SecurityRepo(_transaction)); } }
        public IProductGroupRepo ProductGroupRepo { get { return _productGroupRepo ?? (_productGroupRepo = new ProductGroupRepo(_transaction)); } }
        public ISubGroupRepo SubGroupRepo { get { return _subGroupRepo ?? (_subGroupRepo = new SubGroupRepo(_transaction)); } }
        public IItemRepo ItemRepo { get { return _itemRepo ?? (_itemRepo = new ItemRepo(_transaction)); } }
        public ICountryRepo CountryRepo { get { return _countryRepo ?? (_countryRepo = new CountryRepo(_transaction)); } }
        public ICityRepo CityRepo { get { return _cityRepo ?? (_cityRepo = new CityRepo(_transaction)); } }
        public ICityAreaRepo CityAreaRepo { get { return _cityAreaRepo ?? (_cityAreaRepo = new CityAreaRepo(_transaction)); } }
        public IAddressRepo AddressRepo { get { return _addressRepo ?? (_addressRepo = new AddressRepo(_transaction)); } }
        public IUserRepo UserRepo { get { return _userRepo ?? (_userRepo = new UserRepo(_transaction)); } }
        public ICustomerRepo CustomerRepo { get { return _customerRepo ?? (_customerRepo = new CustomerRepo(_transaction)); } }
        public ISupplierRepo SupplierRepo { get { return _supplierRepo ?? (_supplierRepo = new SupplierRepo(_transaction)); } }
        public IOrderRepo OrderRepo { get { return _orderRepo ?? (_orderRepo = new OrderRepo(_transaction)); } }
        public IInvoiceRepo InvoiceRepo { get { return _invoiceRepo ?? (_invoiceRepo = new InvoiceRepo(_transaction)); } }
        public IDeliveryNoteRepo DeliveryNoteRepo { get { return _deliveryNoteRepo ?? (_deliveryNoteRepo = new DeliveryNoteRepo(_transaction)); } }

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
            _itemRepo = null;
            _countryRepo = null;
            _cityRepo = null;
            _cityAreaRepo = null;
            _addressRepo = null;
            _userRepo = null;
            _customerRepo = null;
            _supplierRepo = null;
            _orderRepo = null;
            _invoiceRepo = null;
            _deliveryNoteRepo = null;
        }

        private ISecurityRepo _securityRepo;
        private IProductGroupRepo _productGroupRepo;
        private ISubGroupRepo _subGroupRepo;
        private IItemRepo _itemRepo;
        private ICountryRepo _countryRepo;
        private ICityRepo _cityRepo;
        private ICityAreaRepo _cityAreaRepo;
        private IAddressRepo _addressRepo;
        private IUserRepo _userRepo;
        private ICustomerRepo _customerRepo;
        private ISupplierRepo _supplierRepo;
        private IOrderRepo _orderRepo;
        private IInvoiceRepo _invoiceRepo;
        private IDeliveryNoteRepo _deliveryNoteRepo;
    }
}
