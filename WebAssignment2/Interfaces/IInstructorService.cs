using WebAssignment2.DTOs;
using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface IInstructorService
    {
        Task<List<Instructor>> GetAll();
        Task<Instructor?> GetById(int id);
        Task<List<InstructorReadDto>> GetAllAsDto();
        Task<InstructorReadDto?> GetByIdAsDto(int id);
        Task<Instructor> Add(Instructor instructor);
        Task<Instructor?> Update(int id, Instructor instructor);
    }
}
