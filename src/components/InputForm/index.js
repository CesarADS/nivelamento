export default function InputForm({
  label,
  type,
  id,
  placeholder,
  value,
  onChange,
  onBlur,
}) {
  return (
    <div className="form-group col-md-12 mt-2 mb-2">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
}
