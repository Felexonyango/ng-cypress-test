describe('Home page', () => {
    beforeEach(()=>{
      cy.visit('/dashboard')

     
    })

    it('should contain a title',()=>{
        cy.contains('Dashboard')
    })
})