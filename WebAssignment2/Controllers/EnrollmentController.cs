using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollmentController : ControllerBase
    {
        private readonly IEnrollmentService _service;

        public EnrollmentController(IEnrollmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var enrollments = await _service.GetAllAsDto();
            return Ok(enrollments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var enrollment = await _service.GetByIdAsDto(id);
            if (enrollment == null)
                return NotFound();
            return Ok(enrollment);
        }

        [Authorize(Roles = UserRole.Admin + "," + UserRole.Instructor)]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] EnrollmentCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _service.Add(FromCreate(dto));
            var result = await _service.GetByIdAsDto(created.Id);
            return Ok(result);
        }

        [Authorize(Roles = UserRole.Admin + "," + UserRole.Instructor)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EnrollmentUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.Update(id, FromUpdate(dto));
            if (updated == null)
                return NotFound();
            var result = await _service.GetByIdAsDto(id);
            return Ok(result);
        }

        [HttpGet("student/{studentId}")]
        public async Task<IActionResult> GetByStudent(int studentId)
        {
            var enrollments = await _service.GetByStudentIdAsDto(studentId);
            return Ok(enrollments);
        }

        private static Enrollment FromCreate(EnrollmentCreateDto dto) =>
            new()
            {
                StudentId = dto.StudentId,
                CourseId = dto.CourseId,
                Grade = dto.Grade
            };

        private static Enrollment FromUpdate(EnrollmentUpdateDto dto) =>
            new()
            {
                StudentId = dto.StudentId,
                CourseId = dto.CourseId,
                Grade = dto.Grade
            };
    }
}
