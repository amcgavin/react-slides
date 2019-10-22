import * as React from 'react'

interface Props {
  onStartDemo: Function
  onNextSlide: Function
  onPreviousSlide: Function
}

const Navigation: React.FC<Props> = ({onStartDemo, onNextSlide, onPreviousSlide}) => {
  React.useEffect(() => {
    const handler = event => {
      let handled = true
      switch (event.keyCode) {
        case 39: // right
          onNextSlide()
          break
        case 37: // left
          onPreviousSlide()
          break
        case 32: // space
          onStartDemo()
          break
        default:
          handled = false
      }
      if (handled) {
        event.stopPropagation()
        event.preventDefault()
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [onNextSlide, onPreviousSlide, onStartDemo])
  return null
}

export default React.memo(Navigation)
