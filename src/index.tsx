import * as React from 'react'
import Navigation from './controls/Navigation'
import CodeView from './controls/CodeView'

interface Slide {
  source: string
  component: React.ComponentType<{}>
}

type Action = 'increment' | 'decrement' | 'toggle-start'

interface State {
  step: number
  start: boolean
}

export interface SlideshowProps {
  slides: Slide[]
}

const initialState: State = {
  step: 0,
  start: false,
}

const createReducer = (slides: Slide[]) => (state: State, action: Action) => {
  const {step} = state
  switch (action) {
    case 'increment':
      return {...state, step: Math.min(step + 1, slides.length - 1)}
    case 'decrement':
      return {...state, step: Math.max(0, step - 1)}
    case 'toggle-start':
      return {...state, start: !state.start}
  }
  return state
}

const Slideshow: React.FC<SlideshowProps> = ({slides}) => {
  const reducer = React.useCallback(createReducer(slides), [slides])
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const onNext = React.useCallback(() => dispatch('increment'), [])
  const onPrevious = React.useCallback(() => dispatch('decrement'), [])
  const onStart = React.useCallback(() => dispatch('toggle-start'), [])
  const {component: Component, source} = slides[state.step]
  return (
    <React.Fragment>
      <Navigation onNextSlide={onNext} onPreviousSlide={onPrevious} onStartDemo={onStart} />
      <CodeView source={source} />
      {state.start && <Component />}
    </React.Fragment>
  )
}

export default Slideshow
