using System;
using System.IO;
using System.Web;
using Umbraco.Core;
using Umbraco.Core.Logging;
using umbraco;

namespace Umbraco.Contact.Settings
{
    public class LanguageInstaller
    {
        private static bool _executed;

        public void CheckAndInstallLanguageActions()
        {
            if (!_executed)
            {
                InstallLanguageKey("sections", "uContactor", "Contact");
                _executed = true;
            }
        }

        private static bool KeyMissing(string area, string key)
        {
            return ui.GetText(area, key) == string.Format("[{0}]", key);
        }

        private static void InstallLanguageKey(string area, string key, string value)
        {
            if (KeyMissing(area, key))
            {
                var directory = HttpContext.Current.Server.MapPath(FormatUrl("/Config/Lang"));
                var languageFiles = Directory.GetFiles(directory);

                foreach (var languagefile in languageFiles)
                {
                    try
                    {
                        //Strip 2digit langcode from filename
                        var langcode = languagefile.Substring(languagefile.Length - 6, 2).ToLower();
                        UpdateActionsForLanguageFile(string.Format("{0}.xml", langcode), area, key, value);

                    }
                    catch (Exception ex)
                    {
                        LogHelper.Error<LanguageInstaller>("uContactor Error in language installer", ex);
                    }
                }
            }
        }

        private static void UpdateActionsForLanguageFile(string languageFile, string area, string key, string value)
        {
            var doc = XmlHelper.OpenAsXmlDocument(string.Format("{0}/Config/Lang/{1}", GlobalSettings.Path, languageFile));
            var actionNode = doc.SelectSingleNode(string.Format("//area[@alias='{0}']", area));

            if (actionNode != null)
            {
                var findSectionKey = actionNode.SelectSingleNode(string.Format("./key[@alias='{0}']", key));
                if(findSectionKey == null)
                {
                    var node = actionNode.AppendChild(doc.CreateElement("key"));
                    if (node.Attributes != null)
                    {
                        var att = node.Attributes.Append(doc.CreateAttribute("alias"));
                        att.InnerText = key;
                    }
                    node.InnerText = value;
                }
            }

            doc.Save(HttpContext.Current.Server.MapPath(string.Format("{0}/config/lang/{1}", GlobalSettings.Path, languageFile)));
        }

        private static string FormatUrl(string url)
        {
            return VirtualPathUtility.ToAbsolute(GlobalSettings.Path + url);
        }
    }
}