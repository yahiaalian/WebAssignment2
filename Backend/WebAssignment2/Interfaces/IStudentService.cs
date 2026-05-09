using WebAssignment2.DTOs;
using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface IStudentService
    {
        Task<List<Student>> GetAll();
        Task<Student?> GetById(int id);
        Task<List<StudentReadDto>> GetAllAsDto();
        Task<StudentReadDto?> GetByIdAsDto(int id);
        Task<Student> Add(Student student);
        Task<Student?> Update(int id, Student student);
        Task<bool> Delete(int id);
    }
}

