import axios from "axios";
import { FormEvent, useRef, useState } from "react";
import { Form } from "react-bootstrap";

// Define the type for the UnsplashImage
type UnsplashImage = {
  id: string;
  alt_description: string;
  urls: {
    small: string;
  };
};

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 10;

const App = () => {
  // Create a reference with the type HTMLInputElement or null
  const searchInput = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState([]); // Create a state for the images
  const [totalPages, setTotalPages] = useState(0); // Create a state for the total pages

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
      // Update the images state
      setImages(data.results);
      // Update the total pages state
      setTotalPages(data.total_pages);
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

      <div className="images">
        {images.map((image: UnsplashImage) => {
          return (
            <img
              alt={image.alt_description}
              className="image"
              key={image.id}
              src={image.urls.small}
            />
          );
        })}
      </div>
    </div>
  );
};

export default App;
