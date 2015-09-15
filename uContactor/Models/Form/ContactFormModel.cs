using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;
using MvcUmbracoDataAnnotations.DataAnnotations;

namespace Umbraco.Contact.Models.Form
{
    public class ContactFormModel
    {
        [UmbracoDisplayLocalised("uContactor.Display.Name")]
        [UmbracoLocalisedRequired("uContactor.Validation.Name")]
        public string Name { get; set; }

        [UmbracoDisplayLocalised("uContactor.Display.Email")]
        [Email("uContactor.Validation.InvalidEmail")]
        [UmbracoLocalisedRequired("uContactor.Validation.Email")]
        public string Email { get; set; }

        [UmbracoDisplayLocalised("uContactor.Display.Subject")]
        [UmbracoLocalisedRequired("uContactor.Validation.Subject")]
        public string Subject { get; set; }

        [UmbracoDisplayLocalised("uContactor.Display.Message")]
        [UmbracoLocalisedRequired("uContactor.Validation.Message")]
        public string Message { get; set; }
        
        //Optional fields as required by Starter-IT
        public string PhoneNumber { get; set; }
        public string WebsiteUrl { get; set; }
        public string CompanyName { get; set; }
        public string Location { get; set; }
        public bool CopyRequested { get; set; }
    }
}