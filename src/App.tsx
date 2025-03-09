import Carousel from './Carousel';
import { cn } from './lib/utils';

const data = [
  {
    title: '1',
    bg: 'bg-purple-300',
  },
  {
    title: '2',
    bg: 'bg-amber-300',
  },
  {
    title: '3',
    bg: 'bg-blue-300',
  },
  {
    title: '4',
    bg: 'bg-green-300',
  },
  {
    title: '5',
    bg: 'bg-yellow-600',
  },
]

function App() {

  return (
    <div className="bg-white">
      <Carousel className="w-[400px]">
        <Carousel.Content>
          {data.map((item) => (
            <Carousel.Item key={item.title} className={cn(item.bg, 'flex h-[200px] items-center justify-center text-2xl text-black')}>
              {item.title}
            </Carousel.Item>
          ))}
        </Carousel.Content>
        <div className="flex flex-col py-4 gap-4">
          <Carousel.Bars />
          <Carousel.Pagination />
        </div>
        <div className="flex justify-between gap-4">
          <Carousel.Previous>
            <button>{`<`}</button>
          </Carousel.Previous>
          <Carousel.Next>
            <button>{`>`}</button>
          </Carousel.Next>
        </div>
      </Carousel>
    </div>
  )
}

export default App
