import { FiCalendar } from 'react-icons/fi';

const FilterControls = ({ periodo, setPeriodo, filtroStatus, setFiltroStatus }) => {
  return (
    <div className="d-flex gap-3">
      <div className="input-group" style={{ width: '180px' }}>
        <span className="input-group-text bg-light border-end-0">
          <FiCalendar />
        </span>
        <select 
          className="form-select border-start-0"
          value={periodo}
          onChange={(e) => setPeriodo(e.target.value)}
        >
          <option value="7dias">Últimos 7 dias</option>
          <option value="30dias">Últimos 30 dias</option>
          <option value="90dias">Últimos 90 dias</option>
          <option value="TODOS">Todos os períodos</option>
        </select>
      </div>
      
      <select 
        className="form-select"
        style={{ width: '180px' }}
        value={filtroStatus}
        onChange={(e) => setFiltroStatus(e.target.value)}
      >
        <option value="TODOS">Todos os status</option>
        <option value="ATIVO">Ativo</option>

        <option value="INATIVO">Inativo</option>
      </select>
    </div>
  );
};

export default FilterControls;