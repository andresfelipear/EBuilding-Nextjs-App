import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';
import '@testing-library/jest-dom/extend-expect';


describe('Footer', () => {
  test('renders contact information', () => {
    const { getByText } = render(<Footer />)
    const contactTitle = getByText('Contact')
    const address = getByText('Burnaby, V5C 1D3')
    const email = getByText('contact@designlux.com')
    const phone = getByText('+1 (236)985-1546')

    expect(contactTitle).toBeInTheDocument()
    expect(address).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(phone).toBeInTheDocument()
  })

  test('renders footer copyright', () => {
    const { getByText } = render(<Footer />)
    const copyright = getByText(/andres arevalo/i)

    expect(copyright).toBeInTheDocument()
  })
})
