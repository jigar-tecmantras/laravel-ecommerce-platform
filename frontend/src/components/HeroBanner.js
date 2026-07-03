import React from 'react';

const HeroBanner = () => (
  <section className='hero'>
    <div className='hero-content'>
      <p className='eyebrow'>Spring collection</p>
      <h1>Curated home essentials crafted for modern living.</h1>
      <p>
        Create rooms that feel purposeful without sacrificing comfort. Our catalog refresh brings timeless
        finishes and sculpted forms.
      </p>
    </div>
    <div className='hero-actions'>
      <button type='button'>Shop featured</button>
      <button type='button' className='ghost'>View catalog</button>
    </div>
  </section>
);

export default HeroBanner;
