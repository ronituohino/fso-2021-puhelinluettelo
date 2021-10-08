import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Phonebook from '../Phonebook'

describe('<Phonebook />', () => {
  test('renders content', () => {
    const component = render(<Phonebook />)
    expect(component.container).toHaveTextContent('Phonebook')
  })
})
