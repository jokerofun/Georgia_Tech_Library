using System.ComponentModel.DataAnnotations;

namespace Georgia_Tech_Library_API.Models.CustomDataAnnotations
{
    public class DateGreaterThanAttribute : ValidationAttribute
    {
        private string DateToCompareFieldName { get; set; }

        public DateGreaterThanAttribute(string dateToCompareFieldName)
        {
            DateToCompareFieldName = dateToCompareFieldName;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime laterDate = (DateTime)value;

            DateTime earlierDate = (DateTime)validationContext.ObjectType.GetProperty(DateToCompareFieldName).GetValue(validationContext.ObjectInstance, null);

            if (laterDate > earlierDate)
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult(string.Format("{0} must be smaller!", DateToCompareFieldName));
            }
        }
    }
}
