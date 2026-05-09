using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAssignment2.DTOs;
using WebAssignment2.Interfaces;
using WebAssignment2.Models;

namespace WebAssignment2.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;


        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }


        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _authService.Register(dto.Username, dto.Email, dto.Password);
            if (user == null)
                return BadRequest("Username or email already in use.");

            return Ok(new { message = "User registered successfully" });
        }


        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _authService.Login(dto.Username, dto.Password);
            if (user == null)
                return Unauthorized("Invalid username or password.");

            var token = _authService.GenerateJwtToken(user);
            var response = new LoginResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Role = user.Role,
                Token = token
            };

            return Ok(response);
        }


        [Authorize(Roles = UserRole.Admin)]
        [HttpPost("assign-role")]
        public async Task<IActionResult> AssignRole([FromBody] AssignRoleDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _authService.AssignRole(dto.Username, dto.Role);
            if (user == null)
                return NotFound("User not found.");

            return Ok(new { message = $"Role assigned to {dto.Username} successfully", role = user.Role });
        }
    }
}
