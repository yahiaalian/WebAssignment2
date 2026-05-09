namespace WebAssignment2.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = UserRole.Admin; // Default role
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

    public static class UserRole
    {
        public const string Admin = "Admin";
        public const string Instructor = "Instructor";
        public const string User = "User";
    }
}
