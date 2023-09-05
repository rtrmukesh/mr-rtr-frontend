import React from "react";
import propTypes from "prop-types";

class ColorPicker extends React.Component {
  render() {
    const colorPickerOptions = [
      {
        color: "#C2938D",
        title: "Slightly Desaturated Red",
      },
      {
        color: "#75B0CE",
        title: "Slightly Desaturated Blue",
      },
      {
        color: "#98366F",
        title: "Dark Moderate Pink",
      },
      {
        color: "#BF4D5C",
        title: "Moderate Red",
      },
      {
        color: "#B5300C",
        title: "Strong Red",
      },
      {
        color: "#000000",
        title: "Black",
      },
      {
        color: "#D15B12",
        title: " Strong Orange",
      },
      {
        color: "#D28F66",
        title: "Moderate Orange",
      },
      {
        color: "#D6B47D",
        title: " Slightly Desaturated Orange",
      },
      {
        color: "#F1EA44",
        title: "Bright Yellow",
      },
      {
        color: "#B0D468",
        title: "Moderate Green",
      },
      {
        color: "#77D2B4",
        title: "Lime Green",
      },
      {
        color: "#3A9BA5",
        title: " Dark Moderate Cyan",
      },
      {
        color: "#085687",
        title: "Dark Blue",
      },
      {
        color: "#747B95",
        title: "Dark Grayish Blue",
      },
      {
        color: "#2C0859",
        title: "Nightmare Moon",
      },
      {
        color: "#FFFFFF",
        title: "White",
      },
      {
        color: "#51147E",
        title: "Violet",
      },
      {
        color: "#963DA2",
        title: "Dark Moderate Violet",
      },
      {
        color: "#C42621",
        title: "Strong Red",
      },
      {
        color: "#EEAD18",
        title: "Vivid Orange",
      },
      {
        color: "#4FAC85",
        title: "Lime Green",
      },
      {
        color: "#F5EEE5",
        title: "Desert yellow",
      },
    ];
    return (
      <div className={"circle-colour-picker"}>
        {colorPickerOptions.map((colorPicker) => (
          <div
            key={colorPicker.color}
            id={colorPicker.color}
            name={this.props.name || "color"}
            title={colorPicker.title}
            onClick={this.props.onColourPickerClick}
            className="circle-colour-wrapper"
            style={{
              borderColor:
                this.props.bannerColor === colorPicker.color
                  ? colorPicker.color
                  : "#ebebeb",
            }}
          >
            <span
              className="circle-colour"
              style={{ background: colorPicker.color }}
            />
          </div>
        ))}
      </div>
    );
  }
}

ColorPicker.propTypes = {
  onColourPickerClick: propTypes.string.isRequired,
};

export default ColorPicker;
