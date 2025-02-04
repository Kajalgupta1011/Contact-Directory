
import CardsPage from './components/CardPage'
import Form from './components/Form'
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">      
        <CardsPage/> 
        <Form/>     
    </main>
  )
}
