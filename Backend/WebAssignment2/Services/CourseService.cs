using Microsoft.EntityFrameworkCore;
using WebAssignment2.Data;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Services
{
    public class CourseService : ICourseService
    {
        private readonly SchoolDbContext _context;

        public CourseService(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task<List<Course>> GetAll() =>
            await _context.Courses.AsNoTracking().Include(c => c.Department).ToListAsync();

        public async Task<Course?> GetById(int id) =>
            await _context.Courses.AsNoTracking().Include(c => c.Department).FirstOrDefaultAsync(c => c.Id == id);

        public async Task<List<CourseReadDto>> GetAllAsDto()
        {
            var courses = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Department)
                .ToListAsync();
            
            var result = new List<CourseReadDto>();
            foreach (var c in courses)
            {
                result.Add(new CourseReadDto
                {
                    Id = c.Id,
                    Title = c.Title,
                    CreditHours = c.CreditHours,
                    DepartmentId = c.DepartmentId,
                    DepartmentName = c.Department?.Name
                });
            }
            return result;
        }

        public async Task<CourseReadDto?> GetByIdAsDto(int id)
        {
            var course = await _context.Courses
                .AsNoTracking()
                .Include(c => c.Department)
                .FirstOrDefaultAsync(c => c.Id == id);
            
            if (course == null)
                return null;
                
            return new CourseReadDto
            {
                Id = course.Id,
                Title = course.Title,
                CreditHours = course.CreditHours,
                DepartmentId = course.DepartmentId,
                DepartmentName = course.Department?.Name
            };
        }

        public async Task<Course> Add(Course course)
        {
            var entity = new Course
            {
                Title = course.Title,
                CreditHours = course.CreditHours,
                DepartmentId = course.DepartmentId
            };
            _context.Courses.Add(entity);
            await _context.SaveChangesAsync();
            await _context.Entry(entity).Reference(x => x.Department).LoadAsync();
            return entity;
        }

        public async Task<Course?> Update(int id, Course course)
        {
            var entity = await _context.Courses.FindAsync(id);
            if (entity == null) return null;
            entity.Title = course.Title;
            entity.CreditHours = course.CreditHours;
            entity.DepartmentId = course.DepartmentId;
            await _context.SaveChangesAsync();
            await _context.Entry(entity).Reference(x => x.Department).LoadAsync();
            return entity;
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Courses.FindAsync(id);
            if (entity == null) return false;
            _context.Courses.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}

