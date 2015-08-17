using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;
using Umbraco.Contact.Models;
using Umbraco.Contact.Models.Poco;
using Umbraco.Core.Persistence;
using Umbraco.Web.Mvc;
using Umbraco.Web.WebApi;

namespace Umbraco.Contact.Controllers
{
    //[Web.WebApi.UmbracoAuthorize]
    [PluginController("uContactor")]
    public class uContactorApiController : UmbracoApiController
    {
        /************************************* CONTACT API ***********************************/
        [System.Web.Http.HttpGet]
        public Page<Contacts> GetAllContacts(string filter, string sort, string orderBy, string search, int? page)
        {
            var settings = GetSettings();
            var db = ApplicationContext.DatabaseContext.Database;
            filter = string.IsNullOrEmpty(filter) ? "all" : filter;
            search = string.IsNullOrEmpty(search) ? "%" : "%" + search + "%";
            sort = string.IsNullOrEmpty(sort) ? "DESC" : sort;
            orderBy = string.IsNullOrEmpty(orderBy) ? "createDate" : orderBy;
            int takeParam = int.Parse(settings.First(x => x.ConfigName == "PageSize").ConfigValue);
            int pageParam = page != null ? (int)page : 1;

            var query = new Sql("SELECT * FROM ContactMessage WHERE (name LIKE @0 OR subject LIKE @0 OR email LIKE @0 OR message LIKE @0)",search);

            if (filter == "trash")
            {
                query.Append("AND isTrashed = @0", true);
            }
            else if (filter == "spam")
            {
                query.Append("AND isSpam = @0 AND isTrashed = @1", true, false);
            }
            else if(filter == "replied")
            {
                query.Append("AND isReplied = @0 AND isSpam = @1 AND isTrashed = @1", true, false);
            }
            else if(filter == "unreplied")
            {
                query.Append("AND isReplied = @0 AND isSpam = @1 AND isTrashed = @1", false, false);
            }

            query.OrderBy(orderBy + " " + sort);

            var data = db.Page<Contacts>(pageParam, takeParam, query);
            var result = new List<Contacts>();

            foreach (var item in data.Items)
            {
                if (item.RepliedDate != null)
                {
                    item.Username = ApplicationContext.Services.UserService.GetUserById((int)item.RepliedByUser).Username;
                }

                result.Add(item);
            }

            data.Items = result;

            return data;
        }

        [System.Web.Http.HttpGet]
        public Contacts GetContact(int id)
        {
            var db = ApplicationContext.DatabaseContext.Database;
            var query = new Sql("SELECT * FROM ContactMessage WHERE Id = @0", id);
            var data = db.SingleOrDefault<Contacts>(query);
            if (data != null && data.RepliedDate != null)
            {
                data.Username = ApplicationContext.Services.UserService.GetUserById((int)data.RepliedByUser).Username;
            }

            return data;
        }

        [System.Web.Http.HttpPost]
        public bool MoveSpam(int id)
        {
            var db = ApplicationContext.DatabaseContext.Database;
            try
            {
                db.Update("ContactMessage", "id", new { isSpam = true }, id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool RemoveFromSpam(int id)
        {
            var db = ApplicationContext.DatabaseContext.Database;
            try
            {
                db.Update("ContactMessage", "id", new { isSpam = false }, id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool MoveToTrash(int id)
        {
            var db = ApplicationContext.DatabaseContext.Database;
            try
            {
                db.Update("ContactMessage", "id", new { isTrashed = true }, id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool DeleteForever(int id)
        {
            var db = ApplicationContext.DatabaseContext.Database;
            try
            {
                var contact = GetContact(id);

                db.Delete(contact);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool RemoveFromTrash(int id)
        {
            var db = ApplicationContext.DatabaseContext.Database;
            try
            {
                db.Update("ContactMessage", "id", new { isTrashed = false }, id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public bool PermanentDeleteContact(int id)
        {
            var db = ApplicationContext.DatabaseContext.Database;
            try
            {
                db.Delete("ContactMessage", "id", null, id);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        [System.Web.Http.HttpPost]
        public Contacts ReplyContact(int id, string message)
        {
            try
            {
                var contact = GetContact(id);
                contact.ReplyMessage = message;
                contact.RepliedDate = DateTime.Now;
                contact.RepliedByUser = umbraco.helper.GetCurrentUmbracoUser().Id;
                contact.Username = umbraco.helper.GetCurrentUmbracoUser().LoginName;
                contact.IsReplied = true;

                MailMessage mail = new MailMessage(umbraco.helper.GetCurrentUmbracoUser().Email, contact.Email);
                mail.Subject = "Re: "+contact.Subject;
                mail.Body = contact.ReplyMessage;
                mail.IsBodyHtml = true;

                SmtpClient client = new SmtpClient();
                client.Send(mail);

                var db = ApplicationContext.DatabaseContext.Database;
                db.Update((ContactPoco)contact);

                return contact;
            }
            catch (Exception)
            {
                return null;
            }
        }

        /************************************* SETTINGS API ***********************************/
        [System.Web.Http.HttpGet]
        public List<ContactSettings> GetSettings()
        {
            try
            {
                var db = ApplicationContext.DatabaseContext.Database;
                var result = db.Fetch<ContactSettings>("SELECT * FROM ContactSettings ORDER BY ConfigSort ASC");
                return result.ToList();
            }
            catch (Exception)
            {
                return null;
            }
        }

        [System.Web.Http.HttpPost]
        public List<ContactSettings> UpdateSettings(List<ContactSettings> config)
        {
            try
            {
                var db = ApplicationContext.DatabaseContext.Database;
                foreach (var item in config)
                {
                    db.Update(item);
                }

                return config;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}