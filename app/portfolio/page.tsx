import Loading from '@/components/loading'
import React, { Suspense } from 'react'
import Components from './components'

const PortfolioPage = () => {
  return (
    <section>
      <Suspense fallback={<Loading />} >
        <Components />
      </Suspense>
    </section>
  )
}

export default PortfolioPage