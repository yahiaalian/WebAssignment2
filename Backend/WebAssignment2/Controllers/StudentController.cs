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
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;


        public StudentController(IStudentService service)
        {
            _service = service;
        }


        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var students = await _service.GetAllAsDto();
            return Ok(students);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var student = await _service.GetByIdAsDto(id);
            if (student == null)
                return NotFound();
            return Ok(student);
        }


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

        [Authorize(Roles = UserRole.Admin + "," + UserRole.Instructor)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.Delete(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }

        private static Student FromCreate(StudentCreateDto dto) =>
            new() { Name = dto.Name, Age = dto.Age };

        private static Student FromUpdate(StudentUpdateDto dto) =>
            new() { Name = dto.Name, Age = dto.Age };
    }
}
