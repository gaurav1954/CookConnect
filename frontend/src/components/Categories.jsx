import React from "react";
import './Categories.css'
import CategoryCard from "./CategoryCard";
import Italian from '../assets/categories/Italian.jpeg';
import Chinese from '../assets/categories/Chinese.jpeg';
import Indian from '../assets/categories/Indian.jpeg';
import French from '../assets/categories/French.jpeg';
import Mexican from '../assets/categories/Mexican.jpeg';
import Japanese from '../assets/categories/Japanese.jpeg';
import Thai from '../assets/categories/Thai.jpeg';
import American from '../assets/categories/American.jpeg';
import Mediterranean from '../assets/categories/Mediterranean.jpeg';
import Spanish from '../assets/categories/Spanish.jpeg';
import Greek from '../assets/categories/Greek.jpeg';
import Vietnamese from '../assets/categories/Vietnamese.jpeg';
import Korean from '../assets/categories/Korean.jpeg';

function Categories() {
  // Array of imported category data
  const categoriesData = [
    { name: 'Italian', image: Italian },
    { name: 'Chinese', image: Chinese },
    { name: 'Indian', image: Indian },
    { name: 'French', image: French },
    { name: 'Mexican', image: Mexican },
    { name: 'Japanese', image: Japanese },
    { name: 'Thai', image: Thai },
    { name: 'American', image: American },
    { name: 'Mediterranean', image: Mediterranean },
    { name: 'Spanish', image: Spanish },
    { name: 'Greek', image: Greek },
    { name: 'Vietnamese', image: Vietnamese },
    { name: 'Korean', image: Korean }
  ];


  return (
    <div className="Categories">
      <div className="categories-heading">
        <h2 className="orange">Recipe Categories</h2>
        Find new and old favorites with CookConnect users' top recipe categories.
      </div>
      <div className="categories-container">
        {/* Mapping over categoriesData to render CategoryCard */}
        {categoriesData.map((category, index) => (
          <CategoryCard key={index} heading={category.name} image={category.image} />
        ))}
      </div>
    </div>
  );
}

export default Categories;
