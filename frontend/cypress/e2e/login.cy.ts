describe('Test Login', () => {
  beforeEach(()=>{
    cy.visit('/')
  })
  it('Login success', () => {
    cy.contains('Login')
    // cy.url().should('include', '/#/login')
    cy.get('input[type="email"]').type('test@gmail.com').should('have.value', 'test@gmail.com')
    cy.get('input[type="password"]').type('test12').should('have.value', 'test12')
    cy.get('button[type="submit"]').click()
    cy.url().visit('/dashboard')
  } )

  it('Login  API Fails', () => {

    cy.intercept(
      {

      method: 'POST',
      url:'https://devconector.herokuapp.com/api/auth',
      
    },
    {
      statusCode: 500,
      body:null
    }
    
    )

    
  } )

 
})