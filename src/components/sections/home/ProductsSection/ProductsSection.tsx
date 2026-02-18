import products1 from './ProductList/products1.json';
import products2 from './ProductList/products2.json';
import products3 from './ProductList/products3.json';
import products4 from './ProductList/products4.json';

import ProductList from './ProductList';

import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';

const ProductsSection = () => {
  return (
    <section id="products" className="pb-10 md:pb-30 scroll-mt-33">
      <SectionGradientLine height="2" />
      <SectionContainer>
        <div className="mb-10">
          <SectionTitle>Our products</SectionTitle>
        </div>
        <div className="flex flex-col gap-5">
          <ProductList list={products1} />
          <ProductList list={products2} directionReverse={true} />
          <ProductList list={products3} />
          <ProductList list={products4} directionReverse={true} />
        </div>
      </SectionContainer>
    </section>
  );
};

export default ProductsSection;
