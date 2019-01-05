using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class CityAreaRepo : BaseRepo, ICityAreaRepo
    {
        public CityAreaRepo(IDbTransaction transaction) : base(transaction) { }
        
        public int Create(CityAreaCreateDTO entityToCreate)
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
        public CityAreaDTO GetByID(int id)
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
        public IEnumerable<CityAreaPreviewDTO> GetAllPreview()
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
        public CityAreaDTO Update(CityAreaDTO updatedRecord)
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