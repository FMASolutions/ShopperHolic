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

        public AboutPageDTO GetAboutPage()
        {
            try
            {
                string query = @"
                SELECT PageTitle, PageDescription, PageRoute, IsHTML
                FROM PageInfo p
                INNER JOIN PageTypes pt on pt.PageTypeID = p.PageTypeID
                WHERE pt.PageType = 'About'";

                return Connection.QueryFirst<AboutPageDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public ContactPageDTO GetContactPage()
        {
            try
            {
                string query = @"
                SELECT PageTitle, PageDescription, PageRoute, IsHTML
                FROM PageInfo p
                INNER JOIN PageTypes pt on pt.PageTypeID = p.PageTypeID
                WHERE pt.PageType = 'Contact'";

                return Connection.QueryFirst<ContactPageDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public LandingPageDTO GetLandingPage()
        {
            try
            {
                string query = @"
                SELECT PageTitle, PageDescription, PageRoute, IsHTML
                FROM PageInfo p
                INNER JOIN PageTypes pt on pt.PageTypeID = p.PageTypeID
                WHERE pt.PageType = 'Landing'";

                return Connection.QueryFirst<LandingPageDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public BasicSiteConfigDTO GetBasicSiteConfig()
        {
            try
            {
                string query = @"
                SELECT AppTitle, AppShortName, AppSlogan, AppFooter 
                FROM SiteConfig";

                return Connection.QueryFirst<BasicSiteConfigDTO>(query, transaction: CurrentTrans);
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public AboutPageDTO UpdateAboutPage(AboutPageDTO newPage)
        {
            try
            {
                string query = @"
                UPDATE p
                SET p.PageTitle = @PageTitle
                ,p.PageDescription = @PageDescription
                ,p.PageRoute = @PageRoute 
                ,p.IsHTML = @IsHTML
                FROM PageInfo p
                INNER JOIN PageTypes pt on pt.PageTypeID = p.PageTypeID
                WHERE pt.PageType = 'About'";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@PageTitle", newPage.PageTitle);
                queryParameters.Add("@PageDescription", newPage.PageDescription);
                queryParameters.Add("@PageRoute", newPage.PageRoute);
                queryParameters.Add("@IsHTML", newPage.IsHTML);

                return (Connection.Execute(query, queryParameters, CurrentTrans) > 0) ? GetAboutPage() : throw noRecordEX;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public ContactPageDTO UpdateContactPage(ContactPageDTO newPage)
        {
            try
            {
                string query = @"
                UPDATE p
                SET p.PageTitle = @PageTitle
                ,p.PageDescription = @PageDescription
                ,p.PageRoute = @PageRoute 
                ,p.IsHTML = @IsHTML
                FROM PageInfo p
                INNER JOIN PageTypes pt on pt.PageTypeID = p.PageTypeID
                WHERE pt.PageType = 'Contact'";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@PageTitle", newPage.PageTitle);
                queryParameters.Add("@PageDescription", newPage.PageDescription);
                queryParameters.Add("@PageRoute", newPage.PageRoute);
                queryParameters.Add("@IsHTML", newPage.IsHTML);

                return (Connection.Execute(query, queryParameters, CurrentTrans) > 0) ? GetContactPage() : throw noRecordEX;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public LandingPageDTO UpdateLandingPage(LandingPageDTO newPage)
        {
            try
            {
                string query = @"
                UPDATE p
                SET p.PageTitle = @PageTitle
                ,p.PageDescription = @PageDescription
                ,p.PageRoute = @PageRoute 
                ,p.IsHTML = @IsHTML
                FROM PageInfo p
                INNER JOIN PageTypes pt on pt.PageTypeID = p.PageTypeID
                WHERE pt.PageType = 'Landing'";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@PageTitle", newPage.PageTitle);
                queryParameters.Add("@PageDescription", newPage.PageDescription);
                queryParameters.Add("@PageRoute", newPage.PageRoute);
                queryParameters.Add("@IsHTML", newPage.IsHTML);

                return (Connection.Execute(query, queryParameters, CurrentTrans) > 0) ? GetLandingPage() : throw noRecordEX;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
        public BasicSiteConfigDTO UpdateSiteConfig(BasicSiteConfigDTO newConfig)
        {
            try
            {
                string query = @"
                UPDATE SiteConfig
                SET AppTitle = @AppTitle
                ,AppShortName = @AppShortName
                ,AppSlogan = @AppSlogan 
                ,AppFooter = @AppFooter";

                var queryParameters = new DynamicParameters();
                queryParameters.Add("@AppTitle", newConfig.AppTitle);
                queryParameters.Add("@AppShortName", newConfig.AppShortName);
                queryParameters.Add("@AppSlogan", newConfig.AppSlogan);
                queryParameters.Add("@AppFooter", newConfig.AppFooter);

                return (Connection.Execute(query, queryParameters, CurrentTrans) > 0) ? GetBasicSiteConfig() : throw noRecordEX;
            }
            catch (Exception ex)
            {
                throw SqlExceptionHandler.HandleSqlException(ex) ?? ex;
            }
        }
    }
}