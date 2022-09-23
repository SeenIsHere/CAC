import { Fragment } from "react";
import { Button } from "react-bootstrap"

 const LoadingPage = () => {
  return (
    <div className="loading-body">
      <div className="loading-container">
        <Button variant="primary" disabled>
          <div className="loading container">
              <span data-text="L">L</span>
              <span data-text="O">O</span>
              <span data-text="A">A</span>
              <span data-text="D">D</span>
              <span data-text="I">I</span>
              <span data-text="N">N</span>
              <span data-text="G">G</span>
            </div>
        </Button>
      </div>
    </div>
  );
};

export default LoadingPage;