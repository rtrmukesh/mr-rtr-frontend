import React from "react";

class Number extends React.Component {
    static Get(data){
          let formatData = data ? parseInt(data) : "";
          return formatData;
      }

    static Float(data) {
      let formatData = data ? parseFloat(data) : "";
      return formatData;
    };
      
    static PercentageData(data) {
        const validation = isFinite(data);
        if (validation) {
          return data;
        } else {
          let value = data.substring(0, data.length - 1);
          return value;
        }
      }
    }
    export default Number;