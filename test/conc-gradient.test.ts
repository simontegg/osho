import conicGradient from '../src/pages/wheel/conic-gradient'
import { schemeTableau10 as colors } from 'd3-scale-chromatic'
import { test, expect } from 'vitest'

test('conicGradient', () => {
  const threePart = conicGradient(['a', 'b', 'c'])
  expect(threePart).toBe(`conic-gradient(${colors[0]} 0deg 120deg, ${colors[1]} 120deg 240deg, ${colors[2]} 240deg)`)
})


