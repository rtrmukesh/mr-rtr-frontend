import React from "react";
import { ThreeBounce } from "better-react-spinkit";

class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  render() {
    return (
      <div className="sweet-loading">
        <ThreeBounce size={25} color="#224a8b" />
      </div>
    );
  }
}

export default Spinner;
