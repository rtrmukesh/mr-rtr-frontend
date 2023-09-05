
import React from "react";
import Text from "./Text";

class AlphaNumericText extends React.Component {
  render() {
    
    return(
      <Text
      label="GST Number"
      name="gst_number"
      placeholder="GST Number"
      noSpecialCharacter
      notify      
      />
    )
  }
}
export default AlphaNumericText;