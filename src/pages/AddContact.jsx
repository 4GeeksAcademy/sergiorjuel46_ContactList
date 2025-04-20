
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact/agendas/sergio/contacts";

export const AddContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    agenda_slug: "sergio", 
  });
  
const handleChange = (e) => {
  const { name, value } = e.target;
  setContact({ ...contact, [name]: value });
};


useEffect(() => {
  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts || [] });

      if (id) {
        const existingContact = data.contacts.find(
          (c) => c.id === parseInt(id)
        );
        if (existingContact) {
          setContact({ ...existingContact, agenda_slug: "sergio" });
        }
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  fetchContacts();
}, [id, dispatch]);

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
        console.log("Nuevo contacto a agregar:", newContact);
        dispatch({ type: "ADD_CONTACT", payload: newContact });
      }

      
      navigate("/");
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
            name="name"
            value={contact.name}
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
        <Link to="/" className="">
          or get back to contacts
        </Link>
      </form>
    </div>
  );
};
