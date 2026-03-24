'use client';

import { useRef } from 'react';

import ProductList from './ProductList';
import { PRODUCT_ROWS } from './productsSection.shared';
import { useDeferredProductRows } from './useDeferredProductRows';

import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';

const ProductsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { visibleRows } = useDeferredProductRows(sectionRef);

  return (
    <section ref={sectionRef} id="products" className="pb-10 md:pb-30 scroll-mt-33">
      <SectionGradientLine height="2" />
      <SectionContainer>
        <div className="mb-10">
          <SectionTitle>Our products</SectionTitle>
        </div>
        <div className="flex flex-col md:gap-5">
          {PRODUCT_ROWS.map(({ list, directionReverse }, index) =>
            index < visibleRows ? (
              <ProductList key={index} list={list} directionReverse={directionReverse} />
            ) : (
              <div key={index} aria-hidden="true" className="h-25.5 rounded-secondary opacity-0" />
            ),
          )}
        </div>
      </SectionContainer>
    </section>
  );
};

export default ProductsSection;
