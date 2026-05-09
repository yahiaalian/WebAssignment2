using WebAssignment2.Models;

namespace WebAssignment2.Interfaces
{
    public interface IAuthService
    {
        Task<User?> Register(string username, string email, string password);
        Task<User?> Login(string username, string password);
        Task<User?> AssignRole(string username, string role);
        string GenerateJwtToken(User user);
        Task<User?> ValidateToken(string token);
    }
}
