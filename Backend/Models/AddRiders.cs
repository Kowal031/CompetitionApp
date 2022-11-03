﻿namespace EuvicWebAPI.Models
{
    public class AddRiders
    {
        public Guid CompetitionId { get; set; }
        public double RiderNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Group { get; set; }
        public string Status { get; set; }
        public int SumPenalityPoints { get; set; }
    }
}
