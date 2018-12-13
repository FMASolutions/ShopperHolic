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

            //Compatibility and Cors
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddCors();

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
                     ClockSkew = TimeSpan.FromMinutes(jwtSettings.MinutesToExpiration)
                 };
             });

            //Add Claim based Authorization (NOTE; Claim Type And Claim Value and BOTH CASE SENSITIVE)
            services.AddAuthorization(config =>
            {
                config.AddPolicy("IsAdminUser", policyBuilder => policyBuilder.RequireClaim("IsAdminUser", "true"));
                config.AddPolicy("CanDeleteProducts", policyBuilder => policyBuilder.RequireClaim("CanDeleteProducts", "true"));
                config.AddPolicy("CanAmendProducts", policyBuilder => policyBuilder.RequireClaim("CanAmendProducts", "true"));
            });
            
            //Add Service Dependency Injection
            string connectionString = Configuration["ShopperHolicDBConnection"];
            IUnitOfWork uow = new UnitOfWork(connectionString);
            services.AddTransient<ISecurityService>(s => new SecurityService(uow));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
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
            app.UseAuthorization();
            app.UseAuthentication();
            app.UseMvc();
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
