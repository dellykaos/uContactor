using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace Umbraco.Contact.Models.Poco
{
    [TableName("ContactSettings")]
    [PrimaryKey("Id", autoIncrement = true)]
    [ExplicitColumns]
    public class ContactSettingsPoco
    {
        [Column("Id")]
        [PrimaryKeyColumn(AutoIncrement=true)]
        public int Id { get; set; }

        [Column("autoReplyMessage")]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        public string AutoReplyMessage {get;set;}

        [Column("itemPerPage")]
        public int ItemPerPage {get;set;}

        [Column("templateAlias")]
        public string TemplateAlias {get;set;}
    }
}