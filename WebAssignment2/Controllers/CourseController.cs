using Microsoft.AspNetCore.Mvc;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Controllers
{
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
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var course = _service.GetById(id);
            if (course == null)
                return NotFound();
            return Ok(course);
        }

        [HttpPost]
        public IActionResult Add(Course course)
        {
            _service.Add(course);
            return Ok(course);
        }
    }
}