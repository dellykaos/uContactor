using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Umbraco.Core.Persistence;
using Umbraco.Core.Persistence.DatabaseAnnotations;

namespace Umbraco.Contact.Models.Poco
{
    [TableName("ContactMessage")]
    [PrimaryKey("Id", autoIncrement=true)]
    [ExplicitColumns]
    public class ContactPoco
    {
        [Column("Id")]
        [PrimaryKeyColumn(AutoIncrement=true)]
        public int Id { get; set; }

        [Column("name")]
        public string Name {get;set;}

        [Column("email")]
        public string Email {get;set;}

        [Column("subject")]
        public string Subject {get;set;}

        [Column("message")]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        public string Message {get;set;}

        [Column("createDate")]
        public DateTime CreateDate {get;set;}

        [Column("isReplied")]
        public bool IsReplied {get;set;}

        [Column("repliedDate")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public DateTime? RepliedDate {get;set;}

        [Column("isSpam")]
        public bool IsSpam{get;set;}

        [Column("isTrashed")]
        public bool IsTrashed{get;set;}

        [Column("user")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public int? RepliedByUser{get;set;}

        [Column("replyMessage")]
        [NullSetting(NullSetting = NullSettings.Null)]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        public string ReplyMessage { get; set; }



        //Optional fields as required by Starter-IT
        [Column("PhoneNumber")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string PhoneNumber { get; set; }

        [Column("WebsiteUrl")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string WebsiteUrl { get; set; }

        [Column("CompanyName")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string CompanyName { get; set; }

        [Column("Location")]
        [NullSetting(NullSetting = NullSettings.Null)]
        public string Location { get; set; }

    }
}