using WebAssignment2.DTOs;
using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetAll();
        Task<Department?> GetById(int id);
        Task<List<DepartmentReadDto>> GetAllAsDto();
        Task<DepartmentReadDto?> GetByIdAsDto(int id);
        Task<Department> Add(Department department);
        Task<Department?> Update(int id, Department department);
        Task<bool> Delete(int id);
    }
}

