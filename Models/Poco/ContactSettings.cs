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
    public class ContactSettings
    {
        [Column("Id")]
        [PrimaryKeyColumn(AutoIncrement = true)]
        public int Id { get; set; }

        [Column("configName")]
        public string ConfigName { get; set; }

        [Column("configValue")]
        [SpecialDbType(SpecialDbTypes.NTEXT)]
        public string ConfigValue { get; set; }

        [Column("configDisplayText")]
        public string ConfigText { get; set; }

        [Column("configHelperText")]
        public string ConfigHelper { get; set; }

        [Column("configSort")]
        public int ConfigSort { get; set; }
    }
}