import BasePage from "./BasePage";
var randomstring = require("randomstring");

class StaffManagementPage extends BasePage {

    get saveStaff() {
        return cy.get('button[type="submit"]')
    }

    get staffSkills() {
        return cy.get('input[placeholder="Select Skills"]')
    }

    get workingDays() {
        return cy.get('form div label span+span').contains('thursday')
    }


    get addStaffButton() {
        return cy.get('button[type="button"][tabindex="0"]').contains('Add Staff')
    }

    get firstname() {
        return cy.get('form p+div div').first()
    }

    get lastName() {
        return cy.get('form p+div div').last()
    }

    get shiftStartEnd() {
        return cy.get('div[aria-haspopup="listbox"]')
    }

    get selectShiftThree() {
        return cy.get('li[data-value="shift_three"]')
    }
    availableCount;
    onLeave;
    onWeeklyOff;
    newavailableCount
    newonLeave
    newonWeeklyOff

    getStaffCount() {
        cy.wait(5000)
        cy.get('.MuiBox-root:nth-child(1) > .MuiGrid-root > .MuiGrid-root:nth-child(1) .MuiBox-root:nth-child(2) > .MuiTypography-root').then($t1 => {
            this.availableCount = $t1.text().split(" ")
            cy.log(this.availableCount[0])

        })
        cy.get('.MuiBox-root:nth-child(1) > .MuiGrid-root > .MuiGrid-root:nth-child(1) .MuiBox-root:nth-child(3) > .MuiTypography-root').then($t2 => {
            this.onLeave = $t2.text().split(" ")
            cy.log(this.onLeave[0])
        })
        cy.get('.MuiBox-root:nth-child(1) > .MuiGrid-root > .MuiGrid-root:nth-child(1) .MuiBox-root:nth-child(5) > .MuiTypography-root').then($t3 => {
            this.onWeeklyOff = $t3.text().split(" ")
            cy.log(this.onWeeklyOff[0])
        })
    }


    addAStaff(firstName, lastName) {
        cy.wait(5000)
        cy.get('div h5+p').first().then($div => {
            const day = $div.text()
            this.addStaffButton.click()
            this.firstname.type(firstName + randomstring.generate(7))
            this.lastName.type(lastName)
            this.shiftStartEnd.click()
            this.selectShiftThree.click()
            this.staffSkills.click()
            cy.contains('Relaxing Swedish').click()
            cy.get('div h2').click()
            cy.get('form label > span+span').contains(day.toLowerCase() + "day").click({force: true})

        });
        this.saveStaff.click()

    }


    getStaffCountAfterAddingStaff() {
        cy.wait(5000)
        cy.get('.MuiBox-root:nth-child(1) > .MuiGrid-root > .MuiGrid-root:nth-child(1) .MuiBox-root:nth-child(2) > .MuiTypography-root').then($t1 => {
            this.newavailableCount = $t1.text().split(" ")
            cy.log(this.newavailableCount[0])
            expect(parseInt(this.newavailableCount[0])).to.be.greaterThan(parseInt(this.availableCount[0]))
        })
        cy.get('.MuiBox-root:nth-child(1) > .MuiGrid-root > .MuiGrid-root:nth-child(1) .MuiBox-root:nth-child(3) > .MuiTypography-root').then($t2 => {
            this.newonLeave = $t2.text().split(" ")
            cy.log(this.newonLeave[0])
            expect(parseInt(this.onLeave[0])).to.be.greaterThan(parseInt(this.newonLeave[0]))
        })
        cy.get('.MuiBox-root:nth-child(1) > .MuiGrid-root > .MuiGrid-root:nth-child(1) .MuiBox-root:nth-child(5) > .MuiTypography-root').then($t3 => {
            this.newonWeeklyOff = $t3.text().split(" ")
            cy.log(this.newonWeeklyOff[0])
            expect(parseInt(this.newonWeeklyOff[0])).to.be.greaterThan(parseInt(this.onWeeklyOff[0]))
        })

    }


}

export default new StaffManagementPage();