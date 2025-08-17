
import React from 'react';

interface ColorPickerProps {
  palettes: { name: string; colors: string[] }[];
  selected: string[];
  onSelect: (colors: string[]) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ palettes, selected, onSelect }) => {
  const isSelected = (paletteColors: string[]) => JSON.stringify(paletteColors) === JSON.stringify(selected);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {palettes.map((palette) => (
        <button
          key={palette.name}
          onClick={() => onSelect(palette.colors)}
          className={`p-3 rounded-lg border-2 transition-all ${
            isSelected(palette.colors) ? 'border-cyan-500' : 'border-gray-700 hover:border-gray-500'
          }`}
        >
          <div className="flex justify-center space-x-2 mb-2">
            {palette.colors.map((color) => (
              <div key={color} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span className={`text-sm ${isSelected(palette.colors) ? 'text-white font-semibold' : 'text-gray-400'}`}>
            {palette.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ColorPicker;
