using EuvicWebAPI.Data;
using EuvicWebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EuvicWebAPI.Controllers
{
    [ApiController]
    [Route("api/Competitions")]
    public class CompetitionsController : Controller
    {
        private readonly APIDbContext dbContext;
        public CompetitionsController(APIDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await dbContext.Competitions.ToListAsync());
            
        }
        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> Get([FromRoute] Guid id) 
        {
            var competitions = await dbContext.Competitions.FindAsync(id);
            if (competitions == null)
            {
                return NotFound();
            }  
            return Ok(competitions);
        }
        [HttpPost]
        public async Task<IActionResult> AddCompetitions(AddCompetitions addCompetitons)
        {
            var competitions = new Competitions()
            {
                Id = Guid.NewGuid(),
                Title = addCompetitons.Title,
                Laps = addCompetitons.Laps,
                Status = addCompetitons.Status,
            };
          await  dbContext.Competitions.AddAsync(competitions);
            await dbContext.SaveChangesAsync();

            return Ok(competitions);
        }
        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateCompetitions([FromRoute] Guid id, UpdateCompetitions updateCompetitions)
        {
            var competitions = await dbContext.Competitions.FindAsync(id);

            if (competitions != null)
            {
                competitions.Status = updateCompetitions.Status;
                await dbContext.SaveChangesAsync();
                return Ok(competitions);
            }
            return NotFound();
        }
    }
}
