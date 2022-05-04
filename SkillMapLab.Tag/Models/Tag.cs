namespace SkillMapLab.Tags.Models
{
    public class Tag
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }

        public Tag()
        {
            Id = Guid.NewGuid();
            Name = string.Empty;
            Description = string.Empty; 
            Status = false;
        }

        public Tag(Guid id, string name, string description, bool status=false)
        {
            Id = id;
            Name = name;
            Description = description;
            Status = status;
        }
    }
}
