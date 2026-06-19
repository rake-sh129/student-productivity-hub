import { useState } from "react";
import '../../styles/Resources.css'

const Resources = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: "MDN Web Docs",
      category: "Documentation",
      link: "https://developer.mozilla.org",
      description: "Best place to learn HTML, CSS, and JavaScript."
    },
    {
      id: 2,
      title: "freeCodeCamp",
      category: "Learning",
      link: "https://www.freecodecamp.org",
      description: "Free coding tutorials and practice projects."
    },
    {
      id: 3,
      title: "React Docs",
      category: "Framework",
      link: "https://react.dev",
      description: "Official React documentation and guides."
    }
  ]);

  const [form, setForm] = useState({
    title: "",
    category: "",
    link: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addResource = (e) => {
    e.preventDefault();

    if (!form.title || !form.link) return;

    const newResource = {
      id: Date.now(),
      ...form
    };

    setResources([newResource, ...resources]);

    setForm({
      title: "",
      category: "",
      link: "",
      description: ""
    });
  };

  const deleteResource = (id) => {
    setResources(resources.filter((item) => item.id !== id));
  };

  return (
    <div className="resources-container">
      <div className="resources-wrapper">
        <h2 className="resources-title">📚 Resources</h2>

        <form className="resource-form" onSubmit={addResource}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="resource-input"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="resource-input"
          />

          <input
            type="url"
            name="link"
            placeholder="Resource Link"
            value={form.link}
            onChange={handleChange}
            className="resource-input resource-input-full"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="resource-textarea"
          />

          <button type="submit" className="resource-submit-btn">
            Add Resource
          </button>
        </form>

        <div className="resource-list">
          {resources.map((res) => (
            <div key={res.id} className="resource-card">
              <div>
                <h3 className="resource-card-title">{res.title}</h3>
                <p className="resource-category">
                  <strong>Category:</strong> {res.category || "N/A"}
                </p>
                <p className="resource-description">
                  {res.description || "No description provided."}
                </p>
              </div>

              <div className="resource-actions">
                <a
                  href={res.link}
                  target="_blank"
                  rel="noreferrer"
                  className="visit-btn"
                >
                  Visit
                </a>

                <button
                  onClick={() => deleteResource(res.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;