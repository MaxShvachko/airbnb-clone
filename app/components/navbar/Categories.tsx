'use client';

import { categories } from '@/app/constants/ui/categories';
import Container from '../Container';
import CategoryBox from '../CategoryBox';

export default function Categories() {
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox key={item.label} {...item} />
        ))}
      </div>
    </Container>
  );
}
