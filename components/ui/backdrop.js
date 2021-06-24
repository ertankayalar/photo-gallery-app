function Backdrop({ onCancel, children }) {
  return (
    <div
      className='backdrop  flex items-center justify-center'
      onClick={onCancel}
    >
      {children}
    </div>
  )
}

export default Backdrop
