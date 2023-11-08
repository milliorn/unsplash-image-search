import { useRef } from "react";
import { Form } from "react-bootstrap";

const App = () => {
  // Create a reference to store the value entered by the user
  const searchInput = useRef(null);
  return (
    <div className="container">
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <Form>
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
