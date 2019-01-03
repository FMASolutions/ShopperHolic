using System;
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
                config.AddPolicy("IsAdminUser", policyBuilder => policyBuilder.RequireClaim("IsAdminUser", "true"));
                config.AddPolicy("UserCanCreateProductGroup", policyBuilder => policyBuilder.RequireClaim("UserCanCreateProductGroup", "true"));
                config.AddPolicy("UserCanEditProductGroup", policyBuilder => policyBuilder.RequireClaim("UserCanEditProductGroup", "true"));
                config.AddPolicy("UserCanDeleteProductGroup", policyBuilder => policyBuilder.RequireClaim("UserCanDeleteProductGroup", "true"));
                config.AddPolicy("UserCanCreateSubGroup", policyBuilder => policyBuilder.RequireClaim("UserCanCreateSubGroup", "true"));
                config.AddPolicy("UserCanEditSubGroup", policyBuilder => policyBuilder.RequireClaim("UserCanEditSubGroup", "true"));
                config.AddPolicy("UserCanDeleteSubGroup", policyBuilder => policyBuilder.RequireClaim("UserCanDeleteSubGroup", "true"));
                config.AddPolicy("UserCanCreateItem", policyBuilder => policyBuilder.RequireClaim("UserCanCreateItem", "true"));
                config.AddPolicy("UserCanEditItem", policyBuilder => policyBuilder.RequireClaim("UserCanEditItem", "true"));
                config.AddPolicy("UserCanDeleteItem", policyBuilder => policyBuilder.RequireClaim("UserCanDeleteItem", "true"));
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
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors(builder => builder.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod());
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "ActionApi",
                    template: "api/{controller}/{action}/{id}"
                );
                routes.MapRoute(
                    name: "default",
                    template: "api/{controller}/{id}"
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
    }
}
