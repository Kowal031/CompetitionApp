namespace EuvicWebAPI.Models
{
    public class AddPenaltyPoints
    {
        public Guid RiderId { get; set; }
        public int PenalityPoints { get; set; }
        public int Number { get; set; }
    }
}
