import React from 'react'

// import BmHero from '../../component/guest/Bmhero/Bmhero.js';
import Hero from './(home)/hero.js';
import BmCategories from "../../component/guest/cards/Bmcategorycards.js";
import NewMaterials from './(home)/newmaterials.js'
import ReusedMaterials from './(home)/reusedmaterials.js'
import Banner from './(home)/banner.js';
import AiAssistant from './(home)/Aiassistant.js';
import TopSuppliers from './(home)/topsupplier.js'
import Faqquestion from './(home)/frequestion.js'
import CustomerReviews from './(home)/customerreview.js'
function page() {
  return (
    <div>
      
      <Hero/>
      <BmCategories/>
      <NewMaterials/>
      <Banner/>
      <ReusedMaterials/>
      <AiAssistant/>
      <TopSuppliers/>
      <CustomerReviews/>
      <Faqquestion/>
      
    </div>
  )
}

export default page;
