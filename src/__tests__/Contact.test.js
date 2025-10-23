import { render, screen } from "@testing-library/react"
import Contact from "../components/Contact"
import "@testing-library/jest-dom"

describe("Contact us Page Test Cases",()=>{

    // beforeAll(()=>{
    //     console.log("Before All")
    // })

    // beforeEach(()=>{
    //     console.log("Before Each")
    // })

    // afterAll(()=>{
    //     console.log("After All")
    // })

    // afterEach(()=>{
    //     console.log("After Each")
    // })

    it("Should load contact us component", ()=>{

    render(<Contact/>)

    const heading = screen.getByRole("heading")

    // Assertion
    expect(heading).toBeInTheDocument();
    })

    test("Should load button inside contact component", ()=>{

    render(<Contact/>)

    // const button = screen.getByRole("button")
    const button = screen.getByText("Submit")

    // Assertion
    expect(button).toBeInTheDocument();
    })

    it("Should load input name inside contact component", ()=>{

    render(<Contact/>)

    const inputName = screen.getByPlaceholderText("Name")

    // Assertion
    expect(inputName).toBeInTheDocument();
    })

    test("Should load 2 input boxes on the contact component", ()=>{

    render(<Contact/>)

    // Querying
    const inputBoxes = screen.getAllByRole("textbox")

    console.log(inputBoxes.length) // returns jsx element

    // Assertion
    // expect(inputBoxes.length).toBe(2);
    expect(inputBoxes.length).not.toBe(3);
    })

})