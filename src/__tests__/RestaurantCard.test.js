import { render, screen } from "@testing-library/react"
import RestaurantCard, {withVegLabel} from "../components/RestaurantCard"
import MOCK_DATA from "../mocks/resCardMock.json"
import "@testing-library/jest-dom"

it("should render Restaurant Card component with Props Data", () =>{
    render(<RestaurantCard resData={MOCK_DATA}/>)

    const name = screen.getByText("Bakery World")

    expect(name).toBeInTheDocument();
})

it("should render RestaurantCard component with Veg Label", () =>{
    const VegRestaurantCard = withVegLabel (RestaurantCard);
    
    render(<VegRestaurantCard resData={MOCK_DATA}/>)

    const label = screen.getByText("Vegeterian")

    expect(label).toBeInTheDocument()
})