import { FormEvent, useRef } from "react";
import { Form } from "react-bootstrap";

const App = () => {
  // Create a reference with the type HTMLInputElement or null
  const searchInput = useRef<HTMLInputElement | null>(null);

  // Handle the search input change event
  const handleInputChange = (event: FormEvent) => {
    event.preventDefault(); // Stop the form from submitting
    console.log("Submitted value: ", searchInput.current?.value); // Log the submitted value
  };

  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
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
    </div>
  );
};

export default App;
