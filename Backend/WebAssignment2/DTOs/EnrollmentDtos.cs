using System.ComponentModel.DataAnnotations;

namespace WebAssignment2.DTOs
{
    public class EnrollmentReadDto
    {
        public int Id { get; set; }
        public int StudentId { get; set; }
        public int CourseId { get; set; }
        public string? Grade { get; set; }
        public string? StudentName { get; set; }
        public string? CourseTitle { get; set; }
    }

    public class EnrollmentCreateDto
    {
        [Required(ErrorMessage = "Student ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Student ID must be a positive integer.")]
        public int StudentId { get; set; }

        [Required(ErrorMessage = "Course ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Course ID must be a positive integer.")]
        public int CourseId { get; set; }

        [MaxLength(1, ErrorMessage = "Grade cannot exceed 1 character.")]
        public string? Grade { get; set; }
    }

    public class EnrollmentUpdateDto
    {
        [Required(ErrorMessage = "Student ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Student ID must be a positive integer.")]
        public int StudentId { get; set; }

        [Required(ErrorMessage = "Course ID is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Course ID must be a positive integer.")]
        public int CourseId { get; set; }

        [MaxLength(1, ErrorMessage = "Grade cannot exceed 1 character.")]
        public string? Grade { get; set; }
    }
}
