using WebAssignment2.Interfaces;
using WebAssignment2.Services;



var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ICourseService, CourseService>();

var app = builder.Build();

app.UseAuthorization();
app.MapControllers();

app.Run();


