import React from 'react'
import { useState } from 'react'
import DisplayProducts from './../DisplayProducts/DisplayProducts';
import { Helmet } from 'react-helmet';

export default function Products() {
  return (
    <section id="products" className='py-10 container mx-auto'>
          <Helmet>
      <title> Products</title>
    </Helmet>
    <DisplayProducts/>
    </section>
  )
}
