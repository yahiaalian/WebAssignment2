using Microsoft.EntityFrameworkCore;
using WebAssignment2.Data;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Services
{
    public class StudentService : IStudentService
    {
        private readonly SchoolDbContext _context;

        public StudentService(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task<List<Student>> GetAll() => await _context.Students.AsNoTracking().ToListAsync();

        public async Task<Student?> GetById(int id) => await _context.Students.AsNoTracking().FirstOrDefaultAsync(s => s.Id == id);

        public async Task<List<StudentReadDto>> GetAllAsDto() =>
            await _context.Students
                .AsNoTracking()
                .Select(s => new StudentReadDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Age = s.Age
                })
                .ToListAsync();

        public async Task<StudentReadDto?> GetByIdAsDto(int id) =>
            await _context.Students
                .AsNoTracking()
                .Where(s => s.Id == id)
                .Select(s => new StudentReadDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Age = s.Age
                })
                .FirstOrDefaultAsync();

        public async Task<Student> Add(Student student)
        {
            var entity = new Student { Name = student.Name, Age = student.Age };
            _context.Students.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Student?> Update(int id, Student student)
        {
            var entity = await _context.Students.FindAsync(id);
            if (entity == null) return null;
            entity.Name = student.Name;
            entity.Age = student.Age;
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
