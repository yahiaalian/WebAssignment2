using WebAssignment2.Models;
using WebAssignment2.Interfaces;

namespace WebAssignment2.Services
{
    public class CourseService : ICourseService
    {
        private static List<Course> courses = new List<Course>();

        public List<Course> GetAll() => courses;

        public Course GetById(int id) =>
            courses.FirstOrDefault(c => c.Id == id);

        public void Add(Course course)
        {
            courses.Add(course);
        }
    }
}