using WebAssignment2.DTOs;
using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface ICourseService
    {
        Task<List<Course>> GetAll();
        Task<Course?> GetById(int id);
        Task<List<CourseReadDto>> GetAllAsDto();
        Task<CourseReadDto?> GetByIdAsDto(int id);
        Task<Course> Add(Course course);
        Task<Course?> Update(int id, Course course);
        Task<bool> Delete(int id);
    }
}

