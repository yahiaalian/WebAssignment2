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
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _service;

        public DepartmentController(IDepartmentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var departments = await _service.GetAllAsDto();
            return Ok(departments);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var department = await _service.GetByIdAsDto(id);
            if (department == null)
                return NotFound();
            return Ok(department);
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] DepartmentCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var created = await _service.Add(FromCreate(dto));
            var result = await _service.GetByIdAsDto(created.Id);
            return Ok(result);
        }

        [Authorize(Roles = UserRole.Admin)]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] DepartmentUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var updated = await _service.Update(id, FromUpdate(dto));
            if (updated == null)
                return NotFound();
            var result = await _service.GetByIdAsDto(id);
            return Ok(result);
        }

        private static Department FromCreate(DepartmentCreateDto dto) =>
            new()
            {
                Name = dto.Name,
                OfficeLocation = dto.OfficeLocation,
                HeadId = dto.HeadId
            };

        private static Department FromUpdate(DepartmentUpdateDto dto) =>
            new()
            {
                Name = dto.Name,
                OfficeLocation = dto.OfficeLocation,
                HeadId = dto.HeadId
            };
    }
}
