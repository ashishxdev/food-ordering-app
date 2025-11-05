import { fireEvent, render, screen } from "@testing-library/react"
import Body from "../components/Body"
import MOCK_DATA from "../mocks/mockRestoListdata.json"
import { act } from "react"
import { BrowserRouter } from "react-router-dom"
import "@testing-library/jest-dom"

global.fetch = jest.fn(()=>{
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_DATA)
        }
    })
})

it("Should Search Res List for Burger Text Input", async () => {
    
    await act(async()=> render(
    <BrowserRouter>
    <Body/>
    </BrowserRouter>
    ))

    const cardsBeforeSearch = screen.getAllByTestId("resCard")
    expect(cardsBeforeSearch.length).toBe(8)

    const searchBtn = screen.getByRole("button", { name: "Search"})
    // console.log(searchBtn)
    // expect(searchBtn).toBeInTheDocument();

    const searchInput = screen.getByTestId("searchInput")

    fireEvent.change(searchInput, { target: { value: "hotel" }})

    fireEvent.click(searchBtn);

    const cardsAfterSearch = screen.getAllByTestId("resCard")

    expect(cardsAfterSearch.length).toBe(2);
})

it("Should filter top rated restaurants", async () => {
    
    await act(async ()=> 
    render(
    <BrowserRouter>
    <Body/>
    </BrowserRouter>
    ))

    const cardsBeforeFilter = screen.getAllByTestId("resCard")
    expect(cardsBeforeFilter.length).toBe(8)

    const topRatedBtn = screen.getByRole("button", { name: "Top Rated Restaurants"})

    fireEvent.click(topRatedBtn)

    const cardsAfterFilter = screen.getAllByTestId("resCard")
    expect(cardsAfterFilter.length).toBe(5)
})