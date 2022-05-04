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

        public void Create(Tag tag)
        {
            tag.Id = Guid.NewGuid();
            _tags.Add(tag);
        }

        public void CreateInBulk(IEnumerable<Tag> tags)
        {
            foreach (var tag in tags)
            {
                tag.Id = Guid.NewGuid();
                _tags.Add(tag);
            }
        }

        public void Delete(Guid id)
        {
            var tagToRemove = _tags.FirstOrDefault(t => t.Id == id);
            if (tagToRemove != null)
            {
                _tags.Remove(tagToRemove);
            }
        }

        public IEnumerable<Tag> GetAll()
        {
            return _tags;
        }

        public Tag GetById(Guid id)
        {
            var tag = _tags.FirstOrDefault(e => e.Id == id);
            if (tag != null)
            {
                return tag;
            }
            else
            {
                //Catch exception
                return new Tag();
            }
        }

        public IEnumerable<Tag> GetByName(string name)
        {
            return from tag in _tags
                   where tag.Name.Contains(name)
                   select tag;
        }

        public void Update(Tag updatedTag)
        {
            if (_tags.Any(t => updatedTag.Id == t.Id))
            {
                var tagToUpdate = _tags.First(t => updatedTag.Id == t.Id);
                tagToUpdate.Name = updatedTag.Name;
                tagToUpdate.Description = updatedTag.Description;
                tagToUpdate.Status = updatedTag.Status;
            }
        }
    }
}
