using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface ICourseService
    {
        List<Course> GetAll();
        Course GetById(int id);
        void Add(Course course);
    }
}