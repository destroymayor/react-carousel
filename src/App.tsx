import Carousel from './Carousel'

import STYLE from './App.module.css'

const data = [
  {
    title: '1',
    bg: 'purple',
  },
  {
    title: '2',
    bg: 'yellow',
  },
  {
    title: '3',
    bg: 'blue',
  },
  {
    title: '4',
    bg: 'green',
  },
  {
    title: '5',
    bg: 'black',
  },
]

function App() {
  return (
    <>
      <Carousel className={STYLE['carousel-container']}>
        <Carousel.Content>
          {data.map((item) => (
            <Carousel.Item key={item.title} className={STYLE['carousel-item']} style={{ backgroundColor: item.bg }}>
              {item.title}
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <div className={STYLE['carousel-pagination-container']}>
          <Carousel.Bars />
          <Carousel.Pagination />
        </div>
        <div className={STYLE['carousel-actions-container']}>
          <Carousel.Previous>
            <button>{`<`}</button>
          </Carousel.Previous>
          <Carousel.Next>
            <button>{`>`}</button>
          </Carousel.Next>
        </div>
      </Carousel>
    </>
  )
}

export default App
