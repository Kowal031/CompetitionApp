using EuvicWebAPI.Data;
using EuvicWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EuvicWebAPI.Controllers
{
    [ApiController]
    [Route("api/PenaltyPoints")]
    public class PenaltyPointsController : Controller
    {
        private readonly APIDbContext dbContext;
        public PenaltyPointsController(APIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await dbContext.PenaltyPoints.ToListAsync());

        }
        [HttpPost]
        public async Task<IActionResult> AddPoints(AddPenaltyPoints addPenaltyPoints)
        {
            var points = new PenaltyPoints()
            {
                Id = Guid.NewGuid(),
                RiderId = addPenaltyPoints.RiderId,
                PenalityPoints = addPenaltyPoints.PenalityPoints,
                Number = addPenaltyPoints.Number
            };
            await dbContext.PenaltyPoints.AddAsync(points);
            await dbContext.SaveChangesAsync();

            return Ok(points);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdatePoints([FromRoute] Guid id, UpdatePenaltyPoints updatePenaltyPoints) 
        {
            var points = await dbContext.PenaltyPoints.FindAsync(id);

            if (points != null)
            {
                points.PenalityPoints = updatePenaltyPoints.PenalityPoints;
                await dbContext.SaveChangesAsync();
                return Ok(points);
            }
            return NotFound();
        }

    }
}
