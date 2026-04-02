using WebAssignment2.DTOs;
using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface IEnrollmentService
    {
        Task<List<Enrollment>> GetAll();
        Task<Enrollment?> GetById(int id);
        Task<List<EnrollmentReadDto>> GetAllAsDto();
        Task<EnrollmentReadDto?> GetByIdAsDto(int id);
        Task<Enrollment> Add(Enrollment enrollment);
        Task<Enrollment?> Update(int id, Enrollment enrollment);
        Task<List<Enrollment>> GetByStudentId(int studentId);
        Task<List<EnrollmentReadDto>> GetByStudentIdAsDto(int studentId);
    }
}
