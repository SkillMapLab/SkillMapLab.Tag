using SkillMapLab.Tags.Models;

namespace SkillMapLab.Tags.Data
{
    public class InMemoryTagRepository : ITagRepository
    {
        readonly List<Tag> _tags;
        public InMemoryTagRepository()
        {
            _tags = new List<Tag>()
            {
                new Tag(Guid.NewGuid(), "BackEnd", "BackEnd", true),
                new Tag(Guid.NewGuid(), "Base de Datos", "Bases de datos", true),
                new Tag(Guid.NewGuid(), "FrontEnd", "FrontEnd", true),
                new Tag(Guid.NewGuid(), "QA", "QA", true),
                new Tag(Guid.NewGuid(), "UX", "UX", true)
            };
        }

        public IEnumerable<Tag> GetAll()
        {
            return _tags;
        }

        public Tag GetById(Guid id)
        {
            var tag= _tags.FirstOrDefault(e => e.Id == id);
            if (tag != null)
            {
                return tag;
            }
            else
            {
                //Catch exception
                return null;
            }

        }

        public IEnumerable<Tag> GetByName(string name)
        {
            return from tag in _tags
                    where tag.Name.Contains(name)
                    select tag;
        }
    }
}
