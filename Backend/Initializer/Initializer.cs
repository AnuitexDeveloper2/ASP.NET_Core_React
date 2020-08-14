using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using QandA.Authorization;
using QandA.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QandA.Initializer
{
    public  class Initializer
    {
        public static void initServices(IServiceCollection services)
        {
            services.AddScoped<IDataRepository, DataRepository>();
            services.AddScoped<IAuthorizationHandler, MustBeQuestionAuthorHandler>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();


        }
    }
}
