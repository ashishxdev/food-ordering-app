import { fireEvent, render, screen } from "@testing-library/react"
import { act } from "react"
import RestaurantMenu from "../components/RestaurantMenu"
import MOCK_DATA from "../mocks/mockResMenu.json"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import Header from "../components/Header"
import Cart from "../components/Cart"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom" 

it("Should load Restaurant Menu component", async()=>{

    global.fetch = jest.fn(() => 
        Promise.resolve({
            json: () => Promise.resolve(MOCK_DATA)
            })
    )

    await act( async () => render(
        <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
            <RestaurantMenu/>
            <Cart/>
        </Provider>
        </BrowserRouter>
    ))

    const accordianHeader = screen.getByText("Beverages(5)")
    fireEvent.click(accordianHeader);

    expect(screen.getAllByTestId("foodItems").length).toBe(5)

    expect(screen.getByText("(0) Cart 🛒")).toBeInTheDocument()

    const addBtns = screen.getAllByRole("button", { name: "Add +"})
    // console.log(addBtns)
    fireEvent.click(addBtns[0])

    // Header
    expect(screen.getByText("(1) Cart 🛒")).toBeInTheDocument()
    
    fireEvent.click(addBtns[1])
    expect(screen.getByText("(2) Cart 🛒")).toBeInTheDocument()

    expect(screen.getAllByTestId("foodItems").length).toBe(7) 

    fireEvent.click(screen.getByRole("button", { name: "Clear Cart" }))

    expect(screen.getByText("(0) Cart 🛒")).toBeInTheDocument()

    expect(screen.getAllByTestId("foodItems").length).toBe(5)

    expect(screen.getByText("Cart is empty. Add Items to the cart!")).toBeInTheDocument()
})