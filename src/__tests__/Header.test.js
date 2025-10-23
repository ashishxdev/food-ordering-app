import { fireEvent, render, screen } from "@testing-library/react"
import Header from "../components/Header"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import appStore from "../utils/appStore"
import "@testing-library/jest-dom"

it("Should render Header Component with a login button", () =>{
    render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    )

    const loginButton = screen.getByRole("button", { name: "Login" }) // If we have more buttons
    // const loginButton = screen.getByText("Login")

    expect(loginButton).toBeInTheDocument();
})

it("Should render Header Component with Cart Items 0", () =>{
    render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    )

    const cartItems = screen.getByText("(0) Cart 🛒") 

    expect(cartItems).toBeInTheDocument();
})

it("Should render Header Component with Cart Item ", () =>{
    render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    )

    const cartItems = screen.getByText(/Cart/) // /Cart/ is a regex

    expect(cartItems).toBeInTheDocument();
})

it("Should change Login to Logout on click", () =>{
    render(
    <BrowserRouter>
        <Provider store={appStore}>
            <Header/>
        </Provider>
    </BrowserRouter>
    )
    const loginButton = screen.getByRole("button", { name: "Login"})
    fireEvent.click(loginButton)

    const logoutButton = screen.getByRole("button", { name: "Logout"})

    expect(logoutButton).toBeInTheDocument();
})