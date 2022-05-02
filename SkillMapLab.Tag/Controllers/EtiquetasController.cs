using Microsoft.AspNetCore.Mvc;

using SkillMapLab.Tag.Data;
using SkillMapLab.Tag.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SkillMapLab.Tag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EtiquetasController : ControllerBase
    {
        private readonly IEtiquetaRepository _etiquetaRepository;

        public EtiquetasController(IEtiquetaRepository etiquetaRepository)
        {
            _etiquetaRepository = etiquetaRepository;
        }

        // GET: api/<EtiquetasController>
        [HttpGet]
        public IEnumerable<Etiqueta> Index()
        {
            return _etiquetaRepository.GetAll();
        }

        // GET api/<EtiquetasController>/5
        [HttpGet("{id}")]
        public Etiqueta GetById(Guid id)
        {
            return _etiquetaRepository.GetById(id);
        }

        // GET api/<EtiquetasController>/name
        [HttpGet("{id}")]
        public IEnumerable<Etiqueta> GetByName(string name)
        {
            return _etiquetaRepository.GetByName(name);
        }

        // POST api/<EtiquetasController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EtiquetasController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EtiquetasController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
