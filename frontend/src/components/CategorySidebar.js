import React from 'react';

const CategorySidebar = ({ categories }) => (
  <aside className='category-sidebar'>
    <h3>Categories</h3>
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <button type='button'>{category.name}</button>
        </li>
      ))}
    </ul>
  </aside>
);

export default CategorySidebar;
