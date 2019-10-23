import * as React from 'react'

interface Props {
  onStartDemo: Function
  onNextSlide: Function
  onPreviousSlide: Function
}

const Navigation: React.FC<Props> = ({onStartDemo, onNextSlide, onPreviousSlide}) => {
  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      let handled = true
      switch (event.code) {
        case "ArrowRight":
          onNextSlide()
          break
        case "ArrowLeft":
          onPreviousSlide()
          break
        case "Space":
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
