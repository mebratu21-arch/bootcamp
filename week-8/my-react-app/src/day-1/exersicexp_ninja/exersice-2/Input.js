export default function Input({ label, name, value, onChange, error }) {

  return (
    <div style={{ marginBottom: "25px" }}>

      <label>{label}</label>
      <br />

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "280px",
          height: "30px",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      {error && (
        <p style={{ color: "red", marginTop: "5px" }}>
          {error}
        </p>
      )}

    </div>
  );
}
