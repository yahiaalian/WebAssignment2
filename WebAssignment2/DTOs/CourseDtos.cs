using System.ComponentModel.DataAnnotations;

namespace WebAssignment2.DTOs
{
    public class CourseReadDto
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int CreditHours { get; set; }
        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
    }

    public class CourseCreateDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [MinLength(3, ErrorMessage = "Title must be at least 3 characters.")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters.")]
        public string? Title { get; set; }

        [Required(ErrorMessage = "Credit hours is required.")]
        [Range(1, 4, ErrorMessage = "Credit hours must be between 1 and 4.")]
        public int CreditHours { get; set; }

        [Required(ErrorMessage = "Department ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Department ID must be a positive integer.")]
        public int DepartmentId { get; set; }
    }

    public class CourseUpdateDto
    {
        [Required(ErrorMessage = "Title is required.")]
        [MinLength(3, ErrorMessage = "Title must be at least 3 characters.")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters.")]
        public string? Title { get; set; }

        [Required(ErrorMessage = "Credit hours is required.")]
        [Range(1, 4, ErrorMessage = "Credit hours must be between 1 and 4.")]
        public int CreditHours { get; set; }

        [Required(ErrorMessage = "Department ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Department ID must be a positive integer.")]
        public int DepartmentId { get; set; }
    }
}
