using System.ComponentModel.DataAnnotations;

namespace EuvicWebAPI.Models
{
    public class Competitions
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
      
        public int Laps { get; set; }   
        public string Status { get; set; }  


    }
}
