using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Mail;
using System.Web.Mvc;
using Umbraco.Contact.Models.Form;
using Umbraco.Contact.Models.Poco;
using Umbraco.Core.Models;
using Umbraco.Web.Mvc;
using Umbraco.Contact.Models;
using Umbraco.Web;

namespace Umbraco.Contact.Controllers
{
    public class ContactController : SurfaceController
    {
        public ActionResult RenderContactForm()
        {
            return PartialView("contactForm", new ContactFormModel());
        }

        public ActionResult RenderCustomContactForm()
        {
            return PartialView("customContactForm", new ContactFormModel());
        }

        [HttpPost]
        public ActionResult HandleContactForm(ContactFormModel contact)
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }

            ContactPoco doc = new ContactPoco();

            doc.Name = contact.Name;
            doc.Email = contact.Email;
            doc.Subject = contact.Subject;
            doc.Message = contact.Message;
            doc.CreateDate = DateTime.Now;
            doc.IsReplied = false;
            doc.IsSpam = false;
            doc.IsTrashed = false;

            var db = ApplicationContext.DatabaseContext.Database;
            db.Insert(doc);

            var settings = db.Fetch<ContactSettings>("SELECT * FROM ContactSettings");

            var templateNode = settings.First(x => x.ConfigName == "TemplateNode").ConfigValue;
            var notificationNode = settings.First(x => x.ConfigName == "NotificationTemplateNode").ConfigValue;

            var node = string.IsNullOrWhiteSpace(templateNode) ? 0 : int.Parse(templateNode);
            var nodeNotification = string.IsNullOrWhiteSpace(notificationNode) ? 0 : int.Parse(notificationNode);

            var tempAutoReply = settings.First(x => x.ConfigName == "AutoReplyMessage").ConfigValue;
            var tempAutoReplySubject = settings.First(x => x.ConfigName == "AutoReplySubject").ConfigValue;

            var tempNotificationMessage = settings.Find(x => x.ConfigName == "NotificationMessage").ConfigValue;
            var tempNotificationSubject = settings.First(x => x.ConfigName == "NotificationSubject").ConfigValue;

            var sender = settings.Find(x => x.ConfigName == "SenderEmail").ConfigValue;
            var senderDisplay = settings.Find(x => x.ConfigName == "DisplayNameSender").ConfigValue;

            var autoReplyMessage = node > 0
                ? Umbraco.TypedContent(node).GetPropertyValue<string>("body") : tempAutoReply;
            var autoReplySubject = node > 0
                ? Umbraco.TypedContent(node).GetPropertyValue<string>("subject") : tempAutoReplySubject;

            string mailBody = autoReplyMessage;
            mailBody = mailBody.Replace("%name%", doc.Name);
            mailBody = mailBody.Replace("%email%", doc.Email);
            mailBody = mailBody.Replace("%subject%", doc.Subject);
            mailBody = mailBody.Replace("%message%", doc.Message);

            autoReplySubject = autoReplySubject.Replace("%name%", doc.Name);
            autoReplySubject = autoReplySubject.Replace("%email%", doc.Email);
            autoReplySubject = autoReplySubject.Replace("%subject%", doc.Subject);
            autoReplySubject = autoReplySubject.Replace("%message%", doc.Message);

            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(sender, senderDisplay);
            mail.To.Add(doc.Email);
            mail.Subject = autoReplySubject;
            mail.Body = mailBody;
            mail.IsBodyHtml = true;

            var notificationEmail = settings.First(x => x.ConfigName == "SendNotificationTo").ConfigValue.Split(new string[] { "," }, StringSplitOptions.RemoveEmptyEntries);
            var notificationMessage = nodeNotification > 0
                ? Umbraco.TypedContent(nodeNotification).GetPropertyValue<string>("body") : tempNotificationMessage;
            var notificationSubject = nodeNotification > 0
                ? Umbraco.TypedContent(nodeNotification).GetPropertyValue<string>("subject") : tempNotificationSubject;

            notificationSubject = notificationSubject.Replace("%name%", doc.Name);
            notificationSubject = notificationSubject.Replace("%email%", doc.Email);
            notificationSubject = notificationSubject.Replace("%subject%", doc.Subject);
            notificationSubject = notificationSubject.Replace("%message%", doc.Message);

            notificationMessage = notificationMessage.Replace("%name%", doc.Name);
            notificationMessage = notificationMessage.Replace("%email%", doc.Email);
            notificationMessage = notificationMessage.Replace("%subject%", doc.Subject);
            notificationMessage = notificationMessage.Replace("%message%", doc.Message);

            MailMessage notifMail = new MailMessage();

            notifMail.From = new MailAddress(sender, senderDisplay);

            foreach (var item in notificationEmail)
            {
                notifMail.To.Add(item);
            }

            notifMail.Subject = notificationSubject;
            notifMail.Body = notificationMessage;
            notifMail.IsBodyHtml = true;

            SmtpClient client = new SmtpClient();
            client.Send(mail);
            client.Send(notifMail);

            TempData["IsSuccessfull"] = true;

            return RedirectToCurrentUmbracoPage();
        }
    }
}
