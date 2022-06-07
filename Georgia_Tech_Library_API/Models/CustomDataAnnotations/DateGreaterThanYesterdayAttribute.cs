using System.ComponentModel.DataAnnotations;

namespace Georgia_Tech_Library_API.Models.CustomDataAnnotations
{
    public class DateGreaterThanYesterdayAttribute : ValidationAttribute
    {
            
        private DateTime CurrentDate { get; set; }

        public DateGreaterThanYesterdayAttribute()
        {
            CurrentDate = DateTime.Now;
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            DateTime fieldDate = (DateTime)value;

            if (fieldDate.Date >= CurrentDate.Date)
            {
                return ValidationResult.Success;
            }
            else
            {
                return new ValidationResult(string.Format("{0} date must be bigger than yesterday", value));
            }
        }
    }
}
