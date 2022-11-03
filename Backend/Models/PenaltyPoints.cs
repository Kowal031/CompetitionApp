using System.ComponentModel.DataAnnotations;

namespace EuvicWebAPI.Models
{
    public class PenaltyPoints
    {
        public Guid Id { get; set; }
        public Guid RiderId { get; set; }
        public int PenalityPoints { get; set; }
        public int Number { get; set; }
    }
}
