'use client'
import Retro from '@/components/portfolios/free/retro';
import Browny from '@/components/portfolios/standard/browny';
import { useSearchParams } from 'next/navigation'

const Components = () => {
    const searchParams = useSearchParams();
    const templateName = searchParams.get('template_name');

    let Component = null;
    if (templateName === 'Retro') Component = <Retro />;
    else if (templateName === 'Browny') Component = <Browny />;
    else Component = <div>Template not found</div>;

    return (
        <>
            {Component}
        </>
  )
}

export default Components