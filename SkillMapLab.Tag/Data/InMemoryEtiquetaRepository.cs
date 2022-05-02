using SkillMapLab.Tag.Models;

namespace SkillMapLab.Tag.Data
{
    public class InMemoryEtiquetaRepository : IEtiquetaRepository
    {
        readonly List<Etiqueta> _etiquetas;
        public InMemoryEtiquetaRepository()
        {
            _etiquetas = new List<Etiqueta>()
            {
                new Etiqueta(Guid.NewGuid(), "BackEnd", "BackEnd", true),
                new Etiqueta(Guid.NewGuid(), "Base de Datos", "Bases de datos", true),
                new Etiqueta(Guid.NewGuid(), "FrontEnd", "FrontEnd", true),
                new Etiqueta(Guid.NewGuid(), "QA", "QA", true),
                new Etiqueta(Guid.NewGuid(), "UX", "UX", true)
            };
        }

        public IEnumerable<Etiqueta> GetAll()
        {
            return _etiquetas;
        }

        public Etiqueta GetById(Guid id)
        {
            var tag= _etiquetas.FirstOrDefault(e => e.Id == id);
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

        public IEnumerable<Etiqueta> GetByName(string name)
        {
            return from tag in _etiquetas
                    where tag.Name.Contains(name)
                    select tag;
        }
    }
}
