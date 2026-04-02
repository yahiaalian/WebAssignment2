using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Controllers
{
    /// <summary>
    /// Manages student-related operations in the school system.
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;

        /// <summary>
        /// Initializes a new instance of the StudentController.
        /// </summary>
        /// <param name="service">The student service dependency.</param>
        public StudentController(IStudentService service)
        {
            _service = service;
        }

        /// <summary>
        /// Retrieves all students.
        /// </summary>
        /// <returns>A list of all students.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _service.GetAllAsDto();
            return Ok(students);
        }

        /// <summary>
        /// Retrieves a specific student by ID.
        /// </summary>
        /// <param name="id">The student's unique identifier.</param>
        /// <returns>The requested student or 404 if not found.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var student = await _service.GetByIdAsDto(id);
            if (student == null)
                return NotFound();
            return Ok(student);
        }

        /// <summary>
        /// Creates a new student (Admin and Instructor only).
        /// </summary>
        /// <param name="dto">Student creation data.</param>
        /// <returns>The created student with HTTP 200, or validation errors with HTTP 400.</returns>
        [Authorize(Roles = UserRole.Admin + "," + UserRole.Instructor)]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] StudentCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _service.Add(FromCreate(dto));
            var result = await _service.GetByIdAsDto(created.Id);
            return Ok(result);
        }

        /// <summary>
        /// Updates an existing student (Admin and Instructor only).
        /// </summary>
        /// <param name="id">The student's unique identifier.</param>
        /// <param name="dto">Student update data.</param>
        /// <returns>The updated student or 404 if not found.</returns>
        [Authorize(Roles = UserRole.Admin + "," + UserRole.Instructor)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] StudentUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.Update(id, FromUpdate(dto));
            if (updated == null)
                return NotFound();
            var result = await _service.GetByIdAsDto(id);
            return Ok(result);
        }

        private static Student FromCreate(StudentCreateDto dto) =>
            new() { Name = dto.Name, Age = dto.Age };

        private static Student FromUpdate(StudentUpdateDto dto) =>
            new() { Name = dto.Name, Age = dto.Age };
    }
}
