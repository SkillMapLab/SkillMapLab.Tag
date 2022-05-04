using Microsoft.AspNetCore.Mvc;

using SkillMapLab.Tags.Data;
using SkillMapLab.Tags.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SkillMapLab.Tags.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagsController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        // GET: api/<TagsController>
        [HttpGet]
        public IEnumerable<Tag> Index()
        {
            return _tagRepository.GetAll();
        }

        // GET api/<TagsController>/5
        [HttpGet("{id}")]
        public Tag GetById(Guid id)
        {
            return _tagRepository.GetById(id);
        }

        // GET api/<TagsController>/name
        [HttpGet("{id}")]
        public IEnumerable<Tag> GetByName(string name)
        {
            return _tagRepository.GetByName(name);
        }
    }
}
