"use client";
import React, { useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";
interface Props {
  value?: string;
  onPickerChange: (color: string) => void;
}
const ColorPicker = ({ value, onPickerChange }: Props) => {
  const [color, setColor] = useState("#aabbcc");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <HexColorPicker color={color} onChange={setColor} />
      <HexColorInput color={color} onChange={setColor} className="hex-input" />
    </div>
  );
};

export default ColorPicker;
