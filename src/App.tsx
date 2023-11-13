/* eslint-disable react/react-in-jsx-scope */
import axios from "axios";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

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
  const [page, setPage] = useState(1); // Create a state for the current page
  const [totalPages, setTotalPages] = useState(0); // Create a state for the total pages

  // Handle the search input change event
  const handleInputChange = (event: FormEvent) => {
    event.preventDefault(); // Stop the form from submitting
    console.log("Submitted value: ", searchInput.current?.value); // Log the submitted value
    resetSearch(); // Reset the search
  };

  // Handle the filter selection
  const handleSelection = (selection: string) => {
    console.log("Selected filter: ", selection); // Log the selected filter
    if (searchInput.current) {
      // Check if the input element exists
      searchInput.current.value = selection || ""; // Provide a default value if selection is falsy
      resetSearch(); // Reset the search
    }
  };

  // Fetch images from the API
  const fetchImages = useCallback(async () => {
    try {
      // Check if the input element exists and has a value
      if (searchInput.current!.value) {
        // Make a request to the Unsplash API
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current!.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        console.log("data", data); // Log the data
        setImages(data.results); // Update the images state
        setTotalPages(data.total_pages); // Update the total pages state
      }
      // If the input element doesn't exist or doesn't have a value
    } catch (error) {
      console.error(error); // Log the error
    }
  }, [page]);

  // Reset the search
  const resetSearch = () => {
    setPage(1); // Reset the page state
    fetchImages(); // Fetch images from the API
  };

  useEffect(() => {
    fetchImages(); // Fetch images from the API
  }, [fetchImages]); // Re-run the effect when the page state changes

  console.log("page", page);

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

      <div className="buttons">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPages && (
          <Button onClick={() => setPage(page + 1)}>Next</Button>
        )}
      </div>
    </div>
  );
};

export default App;
