namespace WebAssignment2.Models
{
    public class Department
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? OfficeLocation { get; set; }
        public int? HeadId { get; set; }
        public Instructor? Head { get; set; }
        public List<Course> Courses { get; set; } = new List<Course>();
    }
}
