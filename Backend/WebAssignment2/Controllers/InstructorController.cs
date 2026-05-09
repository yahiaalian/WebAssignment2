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
    public class InstructorController : ControllerBase
    {
        private readonly IInstructorService _service;

        public InstructorController(IInstructorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var instructors = await _service.GetAllAsDto();
            return Ok(instructors);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var instructor = await _service.GetByIdAsDto(id);
            if (instructor == null)
                return NotFound();
            return Ok(instructor);
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] InstructorCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _service.Add(FromCreate(dto));
            var result = await _service.GetByIdAsDto(created.Id);
            return Ok(result);
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] InstructorUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.Update(id, FromUpdate(dto));
            if (updated == null)
                return NotFound();
            var result = await _service.GetByIdAsDto(id);
            return Ok(result);
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _service.Delete(id);
            if (!deleted)
                return NotFound();
            return NoContent();
        }

        private static Instructor FromCreate(InstructorCreateDto dto) =>
            new() { Name = dto.Name, Email = dto.Email, Rank = dto.Rank };

        private static Instructor FromUpdate(InstructorUpdateDto dto) =>
            new() { Name = dto.Name, Email = dto.Email, Rank = dto.Rank };
    }
}
