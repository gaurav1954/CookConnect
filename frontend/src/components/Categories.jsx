import React from "react";
import './Categories.css'
import CategoryCard from "./CategoryCard";

function Categories() {

  const categories = ['Italian', 'Chinese', 'Indian', 'French', 'Mexican', 'Japanese', 'Thai', 'American', 'Mediterranean', 'Spanish', 'Greek', 'Vietnamese', 'Korean', 'Other']

  return (
    <div className="Categories">
      <div className="categories-container">
        {categories.map((category) => (
          <CategoryCard key={category} heading={category} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
