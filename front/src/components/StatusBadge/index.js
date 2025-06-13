import { FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
  console.log(status);
  const statusConfig = {
    ATIVO: { icon: <FiClock className="me-1" />, class: 'bg-success text-white', text: 'Ativo' },
    INATIVO: { icon: <FiClock className="me-1" />, class: 'bg-danger text-white', text: 'Inativo' },
  };

  const config = statusConfig[status] || { icon: null, class: 'bg-secondary', text: status };

  return (
    <span className={`badge ${config.class} d-flex align-items-center`}>
      {config.icon}
      {config.text}
    </span>
  );
};

export default StatusBadge;