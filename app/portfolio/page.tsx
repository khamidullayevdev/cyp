import Loading from '@/components/loading'
import Retro from '@/components/portfolios/free/retro'
import React, { Suspense } from 'react'

const PortfolioPage = () => {
  return (
    <section>
      <Suspense fallback={<Loading />} >
        <Retro />
      </Suspense>
    </section>
  )
}

export default PortfolioPage