using System;
using Dapper;
using System.Data;
using System.Collections.Generic;
using ShopperHolic.Infrastructure.ShopperHolicDTO;
using ShopperHolic.Infrastructure.ShopperExceptions;

namespace ShopperHolic.Persistence.ShopperHolicDataProvider.Repositories
{
    public class ContentRepo : BaseRepo, IContentRepo
    {
        public ContentRepo(IDbTransaction transaction) : base(transaction) { }
        
    }
}