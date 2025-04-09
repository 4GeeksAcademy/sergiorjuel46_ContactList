
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact/agendas/sergio/contacts";

export const AddContact = () => {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    agenda_slug: "sergio", 
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const existingContact = store.contacts.find(
        (contact) => contact.id === parseInt(id)
      );
      if (existingContact) {
        setContact({ ...existingContact, agenda_slug: "sergio" }); 
      }
    }
  }, [id, store.contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          body: JSON.stringify(contact),
          headers: { "Content-Type": "application/json" },
        });
        await res.json();
        dispatch({ type: "UPDATE_CONTACT", payload: contact });
      } else {
       
        const res = await fetch(API_URL, {
          method: "POST",
          body: JSON.stringify(contact),
          headers: { "Content-Type": "application/json" },
        });
        const newContact = await res.json();
        dispatch({ type: "ADD_CONTACT", payload: newContact });
      }

      
      window.location.href = "/";
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>{id ? "Editar Contacto" : "Agregar Contacto"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="full_name"
            value={contact.full_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={contact.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={contact.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {id ? "Actualizar" : "Agregar"}
        </button>
        <Link to="/" className="btn btn-secondary">
          Cancelar
        </Link>
      </form>
    </div>
  );
};
