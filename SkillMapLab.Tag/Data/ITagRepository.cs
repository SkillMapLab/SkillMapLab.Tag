using SkillMapLab.Tags.Models;

namespace SkillMapLab.Tags.Data
{
    public interface ITagRepository
    {
        public IEnumerable<Tag> GetAll();
        public IEnumerable<Tag> GetByName(string name);
        public Tag GetById(Guid id);
    }
}
