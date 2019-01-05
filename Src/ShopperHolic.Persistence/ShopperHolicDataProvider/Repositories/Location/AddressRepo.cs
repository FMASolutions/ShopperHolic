using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class AddressRepo : BaseRepo, IAddressRepo
    {
        public AddressRepo(IDbTransaction transaction) : base(transaction) { }
        public int Create(AddressCreateDTO entityToCreate)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public AddressDTO GetByID(int id)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public IEnumerable<AddressPreviewDTO> GetAllPreview()
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public AddressDTO Update(AddressDTO updatedRecord)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public bool Delete(int id)
        {
            try
            {
                throw new NotImplementedException();
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}