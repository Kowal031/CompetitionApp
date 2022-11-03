using EuvicWebAPI.Data;
using EuvicWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EuvicWebAPI.Controllers
{
    [ApiController]
    [Route("api/Riders")]
    public class RidersController : Controller
    {
        private readonly APIDbContext dbContext;
        public RidersController(APIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await dbContext.Riders.ToListAsync());

        }
        [HttpPost]
        public async Task<IActionResult> AddRiders(AddRiders addRiders)
        {
            var riders = new Riders()
            {
                Id = Guid.NewGuid(),
                CompetitionId = addRiders.CompetitionId,
                RiderNumber = addRiders.RiderNumber,
                FirstName = addRiders.FirstName,
                LastName = addRiders.LastName,
                Group = addRiders.Group,
                Status = addRiders.Status,
                SumPenalityPoints = addRiders.SumPenalityPoints,

            };
            await dbContext.Riders.AddAsync(riders);
            await dbContext.SaveChangesAsync();

            return Ok(riders);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateRiders([FromRoute] Guid id, UpdateRiders updateRiders)
        {
            var riders = await dbContext.Riders.FindAsync(id);

            if (riders != null)
            {
                riders.SumPenalityPoints = updateRiders.SumPenalityPoints;
                await dbContext.SaveChangesAsync();
                return Ok(riders);
            }
            return NotFound();
        }
        [HttpPatch]
        [Route("{id:guid}")]
        public async Task<IActionResult> PatchRiders([FromRoute] Guid id, PatchRiders patchRiders)
        {
            var riders = await dbContext.Riders.FindAsync(id);

            if (riders != null)
            {
                riders.Status = patchRiders.Status;
                await dbContext.SaveChangesAsync();
                return Ok(riders);
            }
            return NotFound();
        }
    }
}
