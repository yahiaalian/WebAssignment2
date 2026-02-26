using Microsoft.AspNetCore.Mvc;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;

        public StudentController(IStudentService service)
        {
            _service = service;
        }

        // 1️⃣ GET all students
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        // 2️⃣ GET student by id
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var student = _service.GetById(id);
            if (student == null)
                return NotFound();
            return Ok(student);
        }

        // 3️⃣ POST add student
        [HttpPost]
        public IActionResult Add(Student student)
        {
            _service.Add(student);
            return Ok(student);
        }
    }
}