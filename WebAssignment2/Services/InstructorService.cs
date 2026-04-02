using Microsoft.EntityFrameworkCore;
using WebAssignment2.Data;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Services
{
    public class InstructorService : IInstructorService
    {
        private readonly SchoolDbContext _context;

        public InstructorService(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task<List<Instructor>> GetAll() => await _context.Instructors.AsNoTracking().ToListAsync();

        public async Task<Instructor?> GetById(int id) => await _context.Instructors.AsNoTracking().FirstOrDefaultAsync(i => i.Id == id);

        public async Task<List<InstructorReadDto>> GetAllAsDto() =>
            await _context.Instructors
                .AsNoTracking()
                .Select(i => new InstructorReadDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Email = i.Email,
                    Rank = i.Rank
                })
                .ToListAsync();

        public async Task<InstructorReadDto?> GetByIdAsDto(int id) =>
            await _context.Instructors
                .AsNoTracking()
                .Where(i => i.Id == id)
                .Select(i => new InstructorReadDto
                {
                    Id = i.Id,
                    Name = i.Name,
                    Email = i.Email,
                    Rank = i.Rank
                })
                .FirstOrDefaultAsync();

        public async Task<Instructor> Add(Instructor instructor)
        {
            var entity = new Instructor
            {
                Name = instructor.Name,
                Email = instructor.Email,
                Rank = instructor.Rank
            };
            _context.Instructors.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Instructor?> Update(int id, Instructor instructor)
        {
            var entity = await _context.Instructors.FindAsync(id);
            if (entity == null) return null;
            entity.Name = instructor.Name;
            entity.Email = instructor.Email;
            entity.Rank = instructor.Rank;
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
