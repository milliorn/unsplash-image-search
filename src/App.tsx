import axios from "axios";
import { FormEvent, useRef } from "react";
import { Form } from "react-bootstrap";

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 10;

const App = () => {
  // Create a reference with the type HTMLInputElement or null
  const searchInput = useRef<HTMLInputElement | null>(null);

  // Handle the search input change event
  const handleInputChange = (event: FormEvent) => {
    event.preventDefault(); // Stop the form from submitting
    console.log("Submitted value: ", searchInput.current?.value); // Log the submitted value
  };

  // Handle the filter selection
  const handleSelection = (selection: string) => {
    console.log("Selected filter: ", selection); // Log the selected filter
    if (searchInput.current) {
      // Check if the input element exists
      searchInput.current.value = selection || ""; // Provide a default value if selection is falsy
      fetchImages(); // Fetch images from the API
    }
  };

  // Fetch images from the API
  const fetchImages = async () => {
    // Check if the input element exists
    try {
      // Make a GET request to the API
      const { data } = await axios.get(
        `${API_URL}?query=${
          searchInput.current?.value
        }&page=1&per_page=${IMAGES_PER_PAGE}&client_id=${
          import.meta.env.VITE_API_KEY
        }`
      );
      console.log("data", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className=" title">Image Search</h1>
      <div className="search-section">
        <Form onSubmit={handleInputChange}>
          <Form.Control
            type="search"
            placeholder="Type something to search..."
            className="search-input"
            ref={searchInput}
          />
        </Form>
      </div>

      <div className="filters">
        <div onClick={() => handleSelection("random")} className="">
          Random
        </div>
        <div onClick={() => handleSelection("nature")} className="">
          Nature
        </div>
        <div onClick={() => handleSelection("holidays")} className="">
          Holidays
        </div>
        <div onClick={() => handleSelection("cooking")} className="">
          Cooking
        </div>
      </div>
    </div>
  );
};

export default App;
