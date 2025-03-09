import React from 'react';

import { cn } from '@/lib/utils';

type CarouselItemProps = {
    children?: React.ReactNode;
    className?: string;
};

const CarouselItem = (props: CarouselItemProps) => {
    const { children, className } = props;

    return (
        <div className={cn('min-w-0 w-full h-full flex-[0_0_100%]', className)}>{children}</div>
    );
};

export default CarouselItem;
