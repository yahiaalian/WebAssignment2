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
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _service;

        public CourseController(ICourseService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _service.GetAllAsDto();
            return Ok(courses);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _service.GetByIdAsDto(id);
            if (course == null)
                return NotFound();
            return Ok(course);
        }

        [Authorize(Roles = UserRole.Admin + "," + UserRole.Instructor)]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] CourseCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _service.Add(FromCreate(dto));
            var result = await _service.GetByIdAsDto(created.Id);
            return Ok(result);
        }

        [Authorize(Roles = UserRole.Admin + "," + UserRole.Instructor)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] CourseUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.Update(id, FromUpdate(dto));
            if (updated == null)
                return NotFound();
            var result = await _service.GetByIdAsDto(id);
            return Ok(result);
        }

        private static Course FromCreate(CourseCreateDto dto) =>
            new()
            {
                Title = dto.Title,
                CreditHours = dto.CreditHours,
                DepartmentId = dto.DepartmentId
            };

        private static Course FromUpdate(CourseUpdateDto dto) =>
            new()
            {
                Title = dto.Title,
                CreditHours = dto.CreditHours,
                DepartmentId = dto.DepartmentId
            };
    }
}
