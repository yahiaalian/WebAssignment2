using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface IStudentService
    {
        List<Student> GetAll();
        Student GetById(int id);
        void Add(Student student);
    }
}