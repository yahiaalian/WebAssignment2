using Microsoft.EntityFrameworkCore;
using WebAssignment2.Data;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Services
{
    public class EnrollmentService : IEnrollmentService
    {
        private readonly SchoolDbContext _context;

        public EnrollmentService(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task<List<Enrollment>> GetAll() =>
            await _context.Enrollments
                .AsNoTracking()
                .Include(e => e.Student)
                .Include(e => e.Course)
                .ToListAsync();

        public async Task<Enrollment?> GetById(int id) =>
            await _context.Enrollments
                .AsNoTracking()
                .Include(e => e.Student)
                .Include(e => e.Course)
                .FirstOrDefaultAsync(e => e.Id == id);

        public async Task<List<EnrollmentReadDto>> GetAllAsDto()
        {
            var enrollments = await _context.Enrollments
                .AsNoTracking()
                .Include(e => e.Student)
                .Include(e => e.Course)
                .ToListAsync();
            
            var result = new List<EnrollmentReadDto>();
            foreach (var e in enrollments)
            {
                result.Add(new EnrollmentReadDto
                {
                    Id = e.Id,
                    StudentId = e.StudentId,
                    CourseId = e.CourseId,
                    Grade = e.Grade,
                    StudentName = e.Student?.Name,
                    CourseTitle = e.Course?.Title
                });
            }
            return result;
        }

        public async Task<EnrollmentReadDto?> GetByIdAsDto(int id)
        {
            var enrollment = await _context.Enrollments
                .AsNoTracking()
                .Include(e => e.Student)
                .Include(e => e.Course)
                .FirstOrDefaultAsync(e => e.Id == id);
            
            if (enrollment == null)
                return null;
                
            return new EnrollmentReadDto
            {
                Id = enrollment.Id,
                StudentId = enrollment.StudentId,
                CourseId = enrollment.CourseId,
                Grade = enrollment.Grade,
                StudentName = enrollment.Student?.Name,
                CourseTitle = enrollment.Course?.Title
            };
        }

        public async Task<Enrollment> Add(Enrollment enrollment)
        {
            var entity = new Enrollment
            {
                StudentId = enrollment.StudentId,
                CourseId = enrollment.CourseId,
                Grade = enrollment.Grade
            };
            _context.Enrollments.Add(entity);
            await _context.SaveChangesAsync();
            await _context.Entry(entity).Reference(x => x.Student).LoadAsync();
            await _context.Entry(entity).Reference(x => x.Course).LoadAsync();
            return entity;
        }

        public async Task<Enrollment?> Update(int id, Enrollment enrollment)
        {
            var entity = await _context.Enrollments.FindAsync(id);
            if (entity == null) return null;
            entity.StudentId = enrollment.StudentId;
            entity.CourseId = enrollment.CourseId;
            entity.Grade = enrollment.Grade;
            await _context.SaveChangesAsync();
            await _context.Entry(entity).Reference(x => x.Student).LoadAsync();
            await _context.Entry(entity).Reference(x => x.Course).LoadAsync();
            return entity;
        }

        public async Task<List<Enrollment>> GetByStudentId(int studentId) =>
            await _context.Enrollments
                .AsNoTracking()
                .Include(e => e.Student)
                .Include(e => e.Course)
                .Where(e => e.StudentId == studentId)
                .ToListAsync();

        public async Task<List<EnrollmentReadDto>> GetByStudentIdAsDto(int studentId)
        {
            var enrollments = await _context.Enrollments
                .AsNoTracking()
                .Include(e => e.Student)
                .Include(e => e.Course)
                .Where(e => e.StudentId == studentId)
                .ToListAsync();
            
            var result = new List<EnrollmentReadDto>();
            foreach (var e in enrollments)
            {
                result.Add(new EnrollmentReadDto
                {
                    Id = e.Id,
                    StudentId = e.StudentId,
                    CourseId = e.CourseId,
                    Grade = e.Grade,
                    StudentName = e.Student?.Name,
                    CourseTitle = e.Course?.Title
                });
            }
            return result;
        }
    }
}
