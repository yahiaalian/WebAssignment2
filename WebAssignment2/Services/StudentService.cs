using WebAssignment2.Models;
using WebAssignment2.Interfaces;

namespace WebAssignment2.Services
{
    public class StudentService : IStudentService
    {
        private static List<Student> students = new List<Student>();

        public List<Student> GetAll() => students;

        public Student? GetById(int id) =>
            students.FirstOrDefault(s => s.Id == id);

        public void Add(Student student)
        {
            students.Add(student);
        }
    }
}