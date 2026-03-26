import React from "react";

// Define the component props
interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = () => {
  return (
    <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
      <span className="text-xs text-gray-400">Map visualization placeholder</span>
    </div>
  );
};

export default CountryMap;
