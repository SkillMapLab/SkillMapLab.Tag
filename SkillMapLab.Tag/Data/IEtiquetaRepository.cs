using SkillMapLab.Tag.Models;

namespace SkillMapLab.Tag.Data
{
    public interface IEtiquetaRepository
    {
        public IEnumerable<Etiqueta> GetAll();
        public IEnumerable<Etiqueta> GetByName(string name);
        public Etiqueta GetById(Guid id);
    }
}
