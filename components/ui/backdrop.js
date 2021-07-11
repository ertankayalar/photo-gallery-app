function Backdrop({ onCancel, children }) {
  return (
    <div className="backdrop" onClick={onCancel}>
      {children}
    </div>
  );
}

export default Backdrop;
