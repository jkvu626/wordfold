import { expect, test } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'

import React from 'react'
import Home from './page'
import Coordinate from './page'


// to write this kind of test, we need to be able to render canvas, so we need 
// to simply run (once) npm install canvas. Tricky for GUI but these have to 
// be async functions that are cleaned up afterwards. Only for REACT gui
test('Home', async () => {
  const { getByText, getByTestId } = render(<Home />)
  
  const b00 = getByTestId('0,0')
  const b10 = getByTestId('1,0')

  expect(b10.classList.contains('square')).toBe(true)

  fireEvent.click(b10)
  fireEvent.click(b00)

  cleanup()
})

