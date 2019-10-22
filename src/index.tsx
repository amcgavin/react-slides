import * as React from 'react'
import Navigation from './controls/Navigation'

interface Slide {
  source: string
  component: React.ComponentType<{}>
}

type Increment = {type: 'increment'}
type Decrement = {type: 'decrement'}
type Start = {type: 'toggle-start'}
type SetSlides = {type: 'set-slides'; payload: Slide[]}

interface State {
  step: number
  slides: Slide[]
  start: boolean
}

export interface SlideshowProps {
    slides: Slide[]
}

const initialState: State = {
  step: 0,
  slides: [],
  start: false,
}

const reducer = (state: State, action: Increment | Decrement | Start | SetSlides) => {
  const {step, slides} = state
  switch (action.type) {
    case 'increment':
      return {...state, step: Math.min(step + 1, slides.length - 1)}
    case 'decrement':
      return {...state, step: Math.max(0, step - 1)}
    case 'set-slides':
      return {...state, step: 0, slides: action.payload}
    case 'toggle-start':
      return {...state, start: !state.start}
  }
  return state
}

const Slideshow: React.FC<SlideshowProps> = ({slides}) => {
  const [state, dispatch] = React.useReducer(reducer, {...initialState, slides})
    React.useEffect(() => {
        dispatch({type: 'set-slides', payload: slides})
    }, [slides])
  const onNext = React.useCallback(() => dispatch({type: 'increment'}), [])
  const onPrevious = React.useCallback(() => dispatch({type: 'decrement'}), [])
  const onStart = React.useCallback(() => dispatch({type: 'toggle-start'}), [])
    const Component = state.slides[state.step]
  return (
    <React.Fragment>
      <Navigation onNextSlide={onNext} onPreviousSlide={onPrevious} onStartDemo={onStart} />
    </React.Fragment>
  )
}

export default Slideshow
