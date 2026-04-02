using System.ComponentModel.DataAnnotations;

namespace WebAssignment2.DTOs
{
    public class InstructorReadDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Rank { get; set; }
    }

    public class InstructorCreateDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Email must be a valid email address.")]
        [MaxLength(256, ErrorMessage = "Email cannot exceed 256 characters.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Rank is required.")]
        [MinLength(2, ErrorMessage = "Rank must be at least 2 characters.")]
        [MaxLength(50, ErrorMessage = "Rank cannot exceed 50 characters.")]
        public string? Rank { get; set; }
    }

    public class InstructorUpdateDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Email must be a valid email address.")]
        [MaxLength(256, ErrorMessage = "Email cannot exceed 256 characters.")]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Rank is required.")]
        [MinLength(2, ErrorMessage = "Rank must be at least 2 characters.")]
        [MaxLength(50, ErrorMessage = "Rank cannot exceed 50 characters.")]
        public string? Rank { get; set; }
    }
}
