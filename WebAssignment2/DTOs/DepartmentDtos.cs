using System.ComponentModel.DataAnnotations;

namespace WebAssignment2.DTOs
{
    public class DepartmentReadDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? OfficeLocation { get; set; }
        public int? HeadId { get; set; }
        public string? HeadName { get; set; }
    }

    public class DepartmentCreateDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Office location is required.")]
        [MinLength(2, ErrorMessage = "Office location must be at least 2 characters.")]
        [MaxLength(200, ErrorMessage = "Office location cannot exceed 200 characters.")]
        public string? OfficeLocation { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Head ID must be a positive integer.")]
        public int? HeadId { get; set; }
    }

    public class DepartmentUpdateDto
    {
        [Required(ErrorMessage = "Name is required.")]
        [MinLength(2, ErrorMessage = "Name must be at least 2 characters.")]
        [MaxLength(100, ErrorMessage = "Name cannot exceed 100 characters.")]
        public string? Name { get; set; }

        [Required(ErrorMessage = "Office location is required.")]
        [MinLength(2, ErrorMessage = "Office location must be at least 2 characters.")]
        [MaxLength(200, ErrorMessage = "Office location cannot exceed 200 characters.")]
        public string? OfficeLocation { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Head ID must be a positive integer.")]
        public int? HeadId { get; set; }
    }
}
