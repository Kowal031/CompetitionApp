using EuvicWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EuvicWebAPI.Data
{
    public class APIDbContext: DbContext
    {
        public APIDbContext(DbContextOptions options): base(options)
        { }
        public DbSet<Competitions> Competitions { get; set; }
        public DbSet<PenaltyPoints> PenaltyPoints { get; set; }
        public DbSet<Riders> Riders { get; set; }

    }
}
