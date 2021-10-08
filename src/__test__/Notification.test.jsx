import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Notification from '../Notification'

describe('<Notification />', () => {
  test('renders content', () => {
    const notif = {
      message: 'test',
      error: false,
    }

    const component = render(<Notification notification={notif}/>)
    expect(component.container).toHaveTextContent('test')
  })
})
