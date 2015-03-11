using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using umbraco.businesslogic;
using umbraco.BusinessLogic.Actions;
using umbraco.interfaces;
using umbraco.NodeFactory;
using Umbraco.Web.Models.Trees;
using Umbraco.Web.Mvc;
using Umbraco.Web.Trees;

namespace Umbraco.Contact.Settings
{
    [Application("uContactor", "uContactor", "icon-operator", 15)]
    public class uCommentatorTreeController : IApplication
    {
    }

    [Umbraco.Web.Trees.Tree("uContactor", "uContactorSection", "Contact", "icon-operator")]
    [PluginController("uContactor")]
    public class uContactorTreeSectionController : TreeController
    {
        protected override TreeNodeCollection GetTreeNodes(string id, FormDataCollection queryStrings)
        {
            if (id == "-1")
            {
                var nodes = new TreeNodeCollection();

                var allContacts = this.CreateTreeNode("dashboard", id, queryStrings, "All Contact Message", "icon-list", false);
                var repliedContacts = this.CreateTreeNode("replied", id, queryStrings, "Replied Contact Message", "icon-check", false);
                var unRepliedContacts = this.CreateTreeNode("unreplied", id, queryStrings, "Un-Replied Contact Message", "icon-time", false);
                var spamContacts = this.CreateTreeNode("spam", id, queryStrings, "Spam", "icon-squiggly-line", false);
                var trashedContacts = this.CreateTreeNode("trashed", id, queryStrings, "Deleted", "icon-trash", false);
                var settingsContacts = this.CreateTreeNode("settings", id, queryStrings, "Settings", "icon-wrench", false);

                repliedContacts.RoutePath = "/uContactor/uContactorSection/replied/0";
                unRepliedContacts.RoutePath = "/uContactor/uContactorSection/unreplied/0";
                spamContacts.RoutePath = "/uContactor/uContactorSection/spam/0";
                trashedContacts.RoutePath = "/uContactor/uContactorSection/deleted/0";
                settingsContacts.RoutePath = "/uContactor/uContactorSection/settings/0";

                nodes.Add(allContacts);
                nodes.Add(repliedContacts);
                nodes.Add(unRepliedContacts);
                nodes.Add(spamContacts);
                nodes.Add(trashedContacts);
                nodes.Add(settingsContacts);

                return nodes;
            }

            throw new NotImplementedException();
        }

        protected override MenuItemCollection GetMenuForNode(string id, FormDataCollection queryStrings)
        {
            var menu = new MenuItemCollection();
            menu.DefaultMenuAlias = ActionNull.Instance.Alias;

            return menu;
        }
    }
}