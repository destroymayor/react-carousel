import Carousel from './carousel';

import STYLE from './App.module.css';

const data = [
    {
        title: '1',
        bg: 'purple',
        img: 'https://www.embla-carousel.com/static/slide-1-47ed6052f4455272d8f76db16447d760.jpg',
    },
    {
        title: '2',
        bg: 'yellow',
        img: 'https://www.embla-carousel.com/static/slide-2-dc15cfe63eb4aeb8c9c09823179ee64c.jpg',
    },
    {
        title: '3',
        bg: 'blue',
        img: 'https://www.embla-carousel.com/static/slide-3-6362505742d23d7cd240880140151a95.jpg',
    },
    {
        title: '4',
        bg: 'green',
        img: 'https://www.embla-carousel.com/static/slide-4-ebad84cfea5ff9481504ded363c22003.jpg',
    },
    {
        title: '5',
        bg: 'red',
        img: 'https://www.embla-carousel.com/static/slide-5-2d88e98502aa565d6269834d7a7be406.jpg',
    },
];

function App() {
    return (
        <div className={STYLE.wrapper}>
            <Carousel className={STYLE['carousel-container']}>
                <Carousel.Content gap={10}>
                    {data.map((item) => (
                        <Carousel.Item
                            key={item.title}
                            className={STYLE['carousel-item']}
                            width={70}
                            style={{ backgroundColor: item.bg }}
                        >
                            {item.title}
                        </Carousel.Item>
                    ))}
                </Carousel.Content>
                <div className={STYLE['carousel-pagination-container']}>
                    <Carousel.Dots />
                </div>
                <div className={STYLE['carousel-actions-container']}>
                    <Carousel.Previous>
                        <button>{`<`}</button>
                    </Carousel.Previous>
                    <Carousel.Next>
                        <button>{`>`}</button>
                    </Carousel.Next>
                    <Carousel.Toggle></Carousel.Toggle>
                </div>
            </Carousel>
            {/* 
            <Carousel
                className={STYLE['carousel-container-vertical']}
                orientation="vertical"
            >
                <Carousel.Content gap={10}>
                    {data.map((item) => (
                        <Carousel.Item
                            key={item.title}
                            width={100}
                            className={STYLE['carousel-item']}
                            style={{
                                backgroundColor: item.bg,
                            }}
                        >
                            {item.title}
                        </Carousel.Item>
                    ))}
                </Carousel.Content>
                <div className={STYLE['carousel-pagination-container']}>
                    <Carousel.Dots />
                </div>
                <div className={STYLE['carousel-actions-container']}>
                    <Carousel.Previous>
                        <button>{`<`}</button>
                    </Carousel.Previous>
                    <Carousel.Next>
                        <button>{`>`}</button>
                    </Carousel.Next>
                    <Carousel.Toggle></Carousel.Toggle>
                </div>
            </Carousel> */}
        </div>
    );
}

export default App;
