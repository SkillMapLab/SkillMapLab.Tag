namespace SkillMapLab.Tag.Models
{
    public class Etiqueta
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Status { get; set; }

        public Etiqueta()
        {
            Id = Guid.NewGuid();
            Name = string.Empty;
            Description = string.Empty; 
            Status = false;
        }

        public Etiqueta(Guid id, string name, string description, bool status=false)
        {
            Id = id;
            Name = name;
            Description = description;
            Status = status;
        }
    }
}
