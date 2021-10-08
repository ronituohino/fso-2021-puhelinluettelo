describe('Phonebook app', () => {
  beforeEach(() => {
    cy.request('DELETE', 'http://localhost:3001/api/persons/')
    cy.visit('http://localhost:3001')
  })

  it('can open website', () => {
    cy.contains('Phonebook')
  })

  it('can add new numbers', () => {
    cy.get('#name').type('testi')
    cy.get('#number').type('1234567890')
    cy.get('#add_button').click()

    cy.contains('Added testi')
  })
})
