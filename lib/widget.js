const widget = (WidgetComponent) => {
  const Widget = (props) => {
    const { style } = props
    return (
      <WidgetComponent {...props} style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid red',
        ...style
      }} />
    )
  }

  return Widget
}

export default widget
