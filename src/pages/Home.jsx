import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const API_URL = "https://playground.4geeks.com/contact/agendas/sergio/contacts";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

useEffect(() => {
  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        
        if (res.status === 404) {
          await fetch("https://playground.4geeks.com/contact/agendas/sergio", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
          });
          dispatch({ type: "SET_CONTACTS", payload: [] });
          return;
        }
        throw new Error("Error al obtener contactos");
      }

      const data = await res.json();
      dispatch({ type: "SET_CONTACTS", payload: data.contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

    fetchContacts();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">
          <i className="fas fa-plus me-2"></i> Agregar Contacto
        </Link>
      </div>

      <div className="list-group">
        {store.contacts.length > 0 ? (
          store.contacts.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>No hay contactos disponibles.</p>
        )}
      </div>
    </div>
  );
};


const ContactCard = ({ contact, onDelete }) => {
  return (
    <div className="list-group-item d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <img
          src="https://avatar.iran.liara.run/public"
          className="rounded-circle me-3"
          style={{ width: "60px", height: "60px" }}
          alt="profile"
        />
        <div>
          <h5 className="mb-1">{contact.name}</h5>
          <p className="mb-1">
            <i className="fas fa-map-marker-alt me-2"></i> {contact.address}
          </p>
          <p className="mb-1">
            <i className="fas fa-phone me-2"></i> {contact.phone}
          </p>
          <p className="mb-0">
            <i className="fas fa-envelope me-2"></i> {contact.email}
          </p>
        </div>
      </div>
      <div>
        <Link to={`/edit-contact/${contact.id}`} className="btn btn-light me-2">
          <i className="fas fa-pencil-alt"></i>
        </Link>
        <button
          className="btn btn-light"
          onClick={() => onDelete(contact.id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
