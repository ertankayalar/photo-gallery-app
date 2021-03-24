const Container = ({ children, className, style }) => {
  return (
    <div
      className={`max-w-screen-lg  mx-auto ${className ? className : ``}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default Container
