﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cors;
using ShopperHolic.API.ShopperAPI.Models.Security;
using Microsoft.IdentityModel.Tokens;
using ShopperHolic.BusinessServices.ShopperHolicService.Services;
using ShopperHolic.BusinessServices.ShopperHolicService;
using ShopperHolic.Persistence.ShopperHolicDataProvider;
using ShopperHolic.Infrastructure.ShopperHolicDTO;

namespace ShopperHolic.API.ShopperAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Dependency Injection
            MvcServiceCollectionExtensions.AddMvc(services);

            //Add JWTSettings into the service collection for dependency injection.
            JWTSettings jwtSettings = GetJWTSettings();
            services.AddSingleton<JWTSettings>(jwtSettings);
            services.AddSingleton<EncSettings>(GetEncSettings());

            //Configure Authentication to use JwtBearer and set the Allowed parameters.
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })
            .AddJwtBearer("JwtBearer", jwtBearerOptions =>
             {
                 jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters
                 {
                     ValidateIssuerSigningKey = true,
                     IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(jwtSettings.Key)),
                     ValidateIssuer = true,
                     ValidIssuer = jwtSettings.Issuer,

                     ValidateAudience = true,
                     ValidAudience = jwtSettings.Audience,

                     ValidateLifetime = true,
                     ClockSkew = TimeSpan.Zero
                 };
             });
            //Add Claim based Authorization (NOTE; Claim Type And Claim Value and BOTH CASE SENSITIVE)
            services.AddAuthorization(config =>
            {
                var allClaims = Enum.GetValues(typeof(EClaimTypes));
                foreach (var claim in allClaims)
                    config.AddPolicy(claim.ToString(), policyBuilder => policyBuilder.RequireClaim(claim.ToString(), "true"));
            });

            //Compatibility and Cors
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddCors();

            //Add Service Dependency Injection
            string connectionString = Configuration["ShopperHolicDBConnection"];
            services.AddTransient<ISecurityService>(s => new SecurityService(connectionString));
            services.AddTransient<IProductGroupService>(s => new ProductGroupService(connectionString));
            services.AddTransient<ISubGroupService>(s => new SubGroupService(connectionString));
            services.AddTransient<IItemService>(s => new ItemService(connectionString));
            services.AddTransient<ICountryService>(s => new CountryService(connectionString));
            services.AddTransient<ICityService>(s => new CityService(connectionString));
            services.AddTransient<ICityAreaService>(s => new CityAreaService(connectionString));
            services.AddTransient<IAddressService>(s => new AddressService(connectionString));
            services.AddTransient<ICustomerService>(s => new CustomerService(connectionString));
            services.AddTransient<ISupplierService>(s => new SupplierService(connectionString));
            services.AddTransient<IUserService>(s => new UserService(connectionString));
            services.AddTransient<IOrderService>(s => new OrderService(connectionString));
            services.AddTransient<IDeliveryNoteService>(s => new DeliveryNoteService(connectionString));
            services.AddTransient<IInvoiceService>(s => new InvoiceService(connectionString));
            services.AddTransient<IContentService>(s => new ContentService(connectionString));
            services.AddTransient<IRMAService>(s => new RMAService(connectionString));
            services.AddTransient<IReturnNoteService>(s => new ReturnNoteService(connectionString));
            services.AddTransient<ICreditNoteService>(s => new CreditNoteService(connectionString));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            string callingWebsite = Configuration["CallingWebsite"];
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(builder => builder.WithOrigins(callingWebsite).AllowAnyHeader().AllowAnyMethod());
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "ActionApi",
                    template: "{controller}/{action}/{id}"
                );
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action}/{id}"
                );
            });
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

        }

        private JWTSettings GetJWTSettings()
        {
            var settings = new JWTSettings();
            settings.Key = Configuration["JWTSettings:key"];
            settings.Audience = Configuration["JWTSettings:audience"];
            settings.Issuer = Configuration["JWTSettings:issuer"];
            settings.MinutesToExpiration = Convert.ToInt32(Configuration["JWTSettings:minutesToExpiration"]);
            return settings;
        }

        private EncSettings GetEncSettings()
        {
            var settings = new EncSettings();
            settings.IV = Configuration["EncSettings:IV"];
            settings.Key = Configuration["EncSettings:Key"];
            return settings;
        }
    }
}
