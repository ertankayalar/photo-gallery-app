function Backdrop({ onCancel, children }) {
  return (
    <div
      className=' z-0 fixed w-full h-screen top-0 left-0 bg-black opacity-75'
      onClick={onCancel}
    >
      {children}
    </div>
  )
}

export default Backdrop
