using Microsoft.EntityFrameworkCore;
using WebAssignment2.Data;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly SchoolDbContext _context;

        public DepartmentService(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task<List<Department>> GetAll() =>
            await _context.Departments.AsNoTracking().Include(d => d.Head).ToListAsync();

        public async Task<Department?> GetById(int id) =>
            await _context.Departments.AsNoTracking().Include(d => d.Head).FirstOrDefaultAsync(d => d.Id == id);

        public async Task<List<DepartmentReadDto>> GetAllAsDto()
        {
            var departments = await _context.Departments
                .AsNoTracking()
                .Include(d => d.Head)
                .ToListAsync();
            
            var result = new List<DepartmentReadDto>();
            foreach (var d in departments)
            {
                result.Add(new DepartmentReadDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    OfficeLocation = d.OfficeLocation,
                    HeadId = d.HeadId,
                    HeadName = d.Head?.Name
                });
            }
            return result;
        }

        public async Task<DepartmentReadDto?> GetByIdAsDto(int id)
        {
            var department = await _context.Departments
                .AsNoTracking()
                .Include(d => d.Head)
                .FirstOrDefaultAsync(d => d.Id == id);
            
            if (department == null)
                return null;
                
            return new DepartmentReadDto
            {
                Id = department.Id,
                Name = department.Name,
                OfficeLocation = department.OfficeLocation,
                HeadId = department.HeadId,
                HeadName = department.Head?.Name
            };
        }

        public async Task<Department> Add(Department department)
        {
            var entity = new Department
            {
                Name = department.Name,
                OfficeLocation = department.OfficeLocation,
                HeadId = department.HeadId
            };
            _context.Departments.Add(entity);
            await _context.SaveChangesAsync();
            await _context.Entry(entity).Reference(x => x.Head).LoadAsync();
            return entity;
        }

        public async Task<Department?> Update(int id, Department department)
        {
            var entity = await _context.Departments.FindAsync(id);
            if (entity == null) return null;
            entity.Name = department.Name;
            entity.OfficeLocation = department.OfficeLocation;
            entity.HeadId = department.HeadId;
            await _context.SaveChangesAsync();
            await _context.Entry(entity).Reference(x => x.Head).LoadAsync();
            return entity;
        }
    }
}
