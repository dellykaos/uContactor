using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core;
using umbraco.cms.presentation;
using umbraco.BusinessLogic;
using umbraco.cms.businesslogic;
using umbraco.cms.businesslogic.web;
using Umbraco.Core.Persistence;
using Umbraco.Contact.Models.Poco;
using Umbraco.Web;
using Umbraco.Web.UI.JavaScript;

namespace Umbraco.Contact.Settings
{
    public class RegisterEvents : ApplicationEventHandler
    {
        private static LanguageInstaller installer;

        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            var db = applicationContext.DatabaseContext.Database;

            if (!db.TableExist("ContactMessage"))
            {
                db.CreateTable<ContactPoco>(false);
            }

            if (!db.TableExist("ContactSettings"))
            {
                db.CreateTable<ContactSettings>(false);
                var settingsTwo = new List<ContactSettings>()
                {
                    new ContactSettings()
                    {
                        ConfigName = "PageSize",
                        ConfigValue = "10",
                        ConfigText = "Page Size",
                        ConfigHelper = "",
                        ConfigSort = 9
                    },
                    new ContactSettings()
                    {
                        ConfigName = "AutoReplyMessage",
                        ConfigValue = "Thanks for contacting us",
                        ConfigText = "Auto Reply Message",
                        ConfigHelper = "",
                        ConfigSort = 3
                    },
                    new ContactSettings()
                    {
                        ConfigName = "TemplateNode",
                        ConfigValue = "",
                        ConfigText = "Auto Reply Template",
                        ConfigHelper = "",
                        ConfigSort = 4
                    },
                    new ContactSettings()
                    {
                        ConfigName = "SendNotificationTo",
                        ConfigValue = "",
                        ConfigText = "Send Notification To",
                        ConfigHelper = "*Use commas to include multiple email",
                        ConfigSort = 7
                    },
                    new ContactSettings()
                    {
                        ConfigName = "NotificationMessage",
                        ConfigValue = "You have new message from %name%",
                        ConfigText = "Notification Message",
                        ConfigHelper = "",
                        ConfigSort = 6
                    },
                    new ContactSettings()
                    {
                        ConfigName = "AutoReplySubject",
                        ConfigValue = "Thanks for contacting us %name%",
                        ConfigText = "Auto Reply Subject",
                        ConfigHelper = "",
                        ConfigSort = 2
                    },
                    new ContactSettings()
                    {
                        ConfigName = "NotificationSubject",
                        ConfigValue = "New message from %name%",
                        ConfigText = "Notification Subject",
                        ConfigHelper = "",
                        ConfigSort = 5
                    },
                    new ContactSettings()
                    {
                        ConfigName = "NotificationTemplateNode",
                        ConfigValue = "",
                        ConfigText = "Notification Template",
                        ConfigHelper = "",
                        ConfigSort = 8
                    },
                    new ContactSettings()
                    {
                        ConfigName = "SenderEmail",
                        ConfigValue = "noreply@gmail.com",
                        ConfigText = "Sender Email",
                        ConfigHelper = "",
                        ConfigSort = 0
                    },
                    new ContactSettings()
                    {
                        ConfigName = "DisplayNameSender",
                        ConfigValue = "Noreply You Website",
                        ConfigText = "Display Name Sender",
                        ConfigHelper = "",
                        ConfigSort = 1
                    }
                };

                db.BulkInsertRecords(settingsTwo);
            }

            installer = new LanguageInstaller();
            installer.CheckAndInstallLanguageActions();

            var us = applicationContext.Services.UserService;
            var user = us.GetByProviderKey(0);
            if (!user.AllowedSections.Any(x => x == "uContactor"))
            {
                user.AddAllowedSection("uContactor");
                us.Save(user);
            }
        }
    }
}