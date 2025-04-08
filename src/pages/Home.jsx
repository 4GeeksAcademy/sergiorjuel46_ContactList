import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const API_URL = "https://playground.4geeks.com/contact/agendas/sergio/contacts";


export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

  useEffect(() => {
		const fetchContacts = async () => {
			try {
				const res = await fetch(API_URL);
				const data = await res.json();
				dispatch({ type: "SET_CONTACTS", payload: data });
			} catch (error) {
				console.error("Error fetching contacts:", error);
			}
		};

		fetchContacts();
	}, [dispatch]);

	return (
		<div className="container mt-5">
		<div className="list-group">
		  <div className="list-group-item  d-flex align-items-center justify-content-between">
			<div className="d-flex align-items-center">
			  <img
				src="https://avatar.iran.liara.run/public"
				className="rounded-circle me-3"
				style={{ width: "60px", height: "60px" }}
				alt="profile"
			  />
			  <div>
				<h5 className="mb-1">Nombre Apellido</h5>
				<p className="mb-1">
				  <i className="fas fa-map-marker-alt me-2"></i> Dirección
				</p>
				<p className="mb-1">
				  <i className="fas fa-phone me-2"></i> Teléfono
				</p>
				<p className="mb-0">
				  <i className="fas fa-envelope me-2"></i> Email
				</p>
			  </div>
			</div>
			<div>
			  <button className="btn btn-light me-2">
				<i className="fas fa-pencil-alt"></i>
			  </button>
			  <button className="btn btn-light">
				<i className="fas fa-trash"></i>
			  </button>
			</div>
		  </div>
		</div>
	  </div>
	);
  };


