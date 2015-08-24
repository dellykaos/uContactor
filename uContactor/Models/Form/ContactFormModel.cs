using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Umbraco.Contact.Models.Form
{
    public class ContactFormModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }
        
        [Required]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }


        //Optional fields as required by Starter-IT
        public string PhoneNumber { get; set; }
        public string WebsiteUrl { get; set; }
        public string CompanyName { get; set; }
        public string Location { get; set; }
        public bool CopyRequested { get; set; }
    }
}