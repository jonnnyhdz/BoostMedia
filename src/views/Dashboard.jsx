import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./Dashboard.css";
import { FiTrash2, FiEye } from "react-icons/fi"; // ✅ Ícono válido de Feather
import {
  obtenerLeads,
  filtrarLeads,
  responderLead,
} from "../services/contactService";

const ITEMS_PER_PAGE = 6;

const Dashboard = () => {
  const [, setLeads] = useState([]);
  const [search, setSearch] = useState({ name: "", gmail: "" });
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [estadoFiltro, setEstadoFiltro] = useState("todos");

  const cargarLeads = async () => {
    try {
      const data = await obtenerLeads();
      setLeads(data);
      setFilteredLeads(data);
    } catch (error) {
      console.error("Error al cargar leads:", error);
    }
  };

  useEffect(() => {
    cargarLeads();
  }, []);

  useEffect(() => {
    const filtrar = async () => {
      try {
        const data = await filtrarLeads(search);
        setFilteredLeads(data);
        setCurrentPage(1);
      } catch (error) {
        console.error("Error al filtrar:", error);
      }
    };
    const delay = setTimeout(filtrar, 300);
    return () => clearTimeout(delay);
  }, [search]);

  const leadsFiltrados = filteredLeads.filter((lead) => {
    if (estadoFiltro === "respondidos") return lead.respondido === 1;
    if (estadoFiltro === "descartados") return lead.respondido === -1;
    return true;
  });

  const indexOfLast = currentPage * ITEMS_PER_PAGE;
  const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
  const currentLeads = leadsFiltrados.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(leadsFiltrados.length / ITEMS_PER_PAGE);

  const openModal = (lead) => {
    setSelectedLead(lead);
    setReplyMessage("");
    setShowReplyBox(false);
  };

  const closeModal = () => {
    setSelectedLead(null);
    setReplyMessage("");
    setShowReplyBox(false);
  };

  const handleEnviarRespuesta = async () => {
    if (!replyMessage.trim()) {
      return Swal.fire("Atención", "Escribe una respuesta primero.", "warning");
    }

    try {
      Swal.fire({
        title: "Enviando respuesta...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await responderLead(selectedLead.gmail, replyMessage);
      Swal.fire("¡Éxito!", "Respuesta enviada correctamente.", "success");
      closeModal();
      await cargarLeads();
    } catch (err) {
      Swal.fire("Error", "Hubo un problema al enviar la respuesta.", "error");
    }
  };

  const handleDescartar = async (lead) => {
    const confirm = await Swal.fire({
      title: "¿Descartar lead?",
      text: "Esta acción marcará el lead como descartado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, descartar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    try {
      await responderLead(lead.gmail, "DESCARTADO", -1);
      Swal.fire("Lead descartado correctamente.", "", "success");
      await cargarLeads();
    } catch (err) {
      Swal.fire("Error al descartar.", "", "error");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Panel de Leads</h1>

      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={search.name}
          onChange={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Buscar por correo"
          value={search.gmail}
          onChange={(e) => setSearch({ ...search, gmail: e.target.value })}
        />
        <select
          value={estadoFiltro}
          onChange={(e) => setEstadoFiltro(e.target.value)}
          className="estado-select"
        >
          <option value="todos">Mostrar todos</option>
          <option value="respondidos">Solo respondidos</option>
          <option value="descartados">Solo descartados</option>
        </select>
      </div>

      <div className="table-container">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th>Mensaje</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.phone}</td>
                <td>{lead.gmail}</td>
                <td>
                  <button
                    className="msg-btn"
                    onClick={() => openModal(lead)}
                    title="Ver mensaje"
                  >
                    <FiEye style={{ marginRight: "6px" }} />
                    <span className="icon-label">Ver</span>
                  </button>
                </td>

                <td>{new Date(lead.date).toLocaleString()}</td>
                <td>
                  {lead.respondido === 1 ? (
                    <span className="estado respondido">Respondido</span>
                  ) : lead.respondido === -1 ? (
                    <span className="estado descartado">Descartado</span>
                  ) : (
                    <span className="estado pendiente">Pendiente</span>
                  )}
                </td>
                <button
                  className="btn-descartar"
                  onClick={() => handleDescartar(lead)}
                  title="Descartar Lead"
                >
                  <FiTrash2 />
                  <span className="icon-label">Descartar</span>
                </button>
              </tr>
            ))}
          </tbody>
        </table>

        {currentLeads.length === 0 && (
          <p className="no-results">No se encontraron leads.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {selectedLead && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Mensaje de {selectedLead.name}</h2>
            <p>{selectedLead.message}</p>

            <button
              className="reply-toggle-btn"
              onClick={() => setShowReplyBox(!showReplyBox)}
            >
              {showReplyBox ? "Cancelar" : "Responder"}
            </button>

            {showReplyBox && (
              <div className="reply-box">
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Escribe tu respuesta aquí..."
                />
                <button
                  onClick={handleEnviarRespuesta}
                  className="send-reply-btn"
                >
                  Enviar respuesta
                </button>
              </div>
            )}

            <button className="close-modal-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
