import React from 'react'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { Helmet } from 'react-helmet'

export default function Home() {

  return (
    <>
    <Helmet>
      <title>Home page</title>
    </Helmet>
    <MainSlider/>
    <CategorySlider/>
    <DisplayProducts/>
    </>
  )
}
