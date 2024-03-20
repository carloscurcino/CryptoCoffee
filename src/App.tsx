import { useEffect, useState } from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './components/ui/table'
import './global.css'
import coinService from "./services/coins"
import { ChevronDown, ChevronUp, Flame, Heart, Info } from 'lucide-react'
import { CoinInterface } from './interfaces/coinsInterface'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip'
import { formatNumber } from './services/formatNumber'

function App() {
  const [coinsByMarket, setCoinsByMarket] = useState<CoinInterface[]>([])
  const [topGainers, setTopGainers] = useState<CoinInterface[]>([])
  const [favorites, setFavorites] = useState<CoinInterface[]>([])

  useEffect(() => {
    coinService.getAllByMarket("usd").then((coins) => {
      setCoinsByMarket(coins?.data.slice(0, 10))
    }).catch((err) => console.error(err));

    coinService.getAllByVolume("usd").then((coins) => {
      setTopGainers(coins?.data.slice(0, 3))
    }).catch((err) => console.error(err));
  }, [])

  useEffect(() => {
    console.log(coinsByMarket)
  }, [coinsByMarket])

  return (
    <main>
      <section id='infos' className='grid lg:grid-cols-3 p-24 gap-3'>
        <div className='flex flex-col gap-2 h-64'>
          <Card className='overflow-hidden flex items-center justify-between gap-3 rounded-xl bg-white p-4 ring-2 ring-gray-200 dark:bg-moon-900 dark:ring-moon-700'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
          </Card>

          <Card className='overflow-hidden flex items-center justify-between gap-3 rounded-xl bg-white p-4 ring-2 ring-gray-200 dark:bg-moon-900 dark:ring-moon-700'>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{formatNumber('currency', 'narrowSymbol').format(0.99125)}</p>
              <p>{formatNumber('currency', 'narrowSymbol').format(10.25952)}</p>
            </CardContent>
          </Card>
        </div>
        <Card className='h-64 ring-gray-200 dark:ring-moon-700 ring-2 py-1.5 px-2 rounded-xl'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='flex items-end'>
              <Flame className='text-light_red' /> Trending
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger><Info size={16} /></TooltipTrigger>
                  <TooltipContent>
                    <p>Top cryptocurrencies by volume</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </CardTitle>
            <CardDescription><a href="#">View more</a></CardDescription>
          </CardHeader>
          <CardContent className='flex flex-col'>
            {topGainers && topGainers.map((topCoin, index) =>
              <div key={index} className='flex justify-between items-center border-y border-gray-200 py-2'>
                <span className='flex items-center w-[20%] flex-1 gap-0.5'>
                  <img
                    className='h-8'
                    src={topCoin.image}
                    alt={`${topCoin.name} image`}
                  />
                  {topCoin.name}
                </span>
                <span className='text-left flex-1 min-w-[10%]'>{formatNumber('currency', 'narrowSymbol').format(topCoin.current_price)}</span>
                <span className={`flex items-start text-left flex-1 ${topCoin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {topCoin.price_change_percentage_24h >= 0 ? <ChevronUp /> : <ChevronDown />}
                  {formatNumber('percent', 'narrowSymbol').format(topCoin.price_change_percentage_24h / 100)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className='h-64 ring-gray-200 dark:ring-moon-700 ring-2 py-1.5 px-2 rounded-xl'>
          <CardHeader className='flex flex-row items-center justify-between'>
            <CardTitle className='flex items-center'>
              <Heart className='fill-light_red text-light_red' /> Favorites</CardTitle>
            <CardDescription><a href="#">View more</a></CardDescription>
          </CardHeader>
          <CardContent>
            {favorites.length > 0 ? (
              favorites.map((coin, index) => (
                <div key={index} className='flex justify-between items-center border-y border-gray-200 py-2'>
                  <span className='flex items-center w-[20%] flex-1'>
                    <img
                      className='h-8'
                      src={coin.image}
                      alt={`${coin.name} image`}
                    />
                    {coin.name}
                  </span>
                  <span className='text-left flex-1 min-w-[10%]'>${coin.current_price}</span>
                  <span className={`flex items-start text-left flex-1 ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.price_change_percentage_24h >= 0 ? <ChevronUp /> : <ChevronDown />}
                    {coin.price_change_percentage_24h}%
                  </span>
                </div>
              )
              )
            ) : (
              <p className='text-center'>Has no favorites yet!</p>
            )}
          </CardContent>
        </Card>
      </section>

      <section id='top-list' className='p-24'>
        <h2 className='font-bold text-2xl mb-3'>Top 10 cryptocurrencies per market cap</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead className="w-[180px]">Name</TableHead>
              <TableHead>Symbol</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24H</TableHead>
              <TableHead>Volume</TableHead>
              <TableHead className="text-right">Capitalizantion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coinsByMarket && coinsByMarket.map((coin, index) => (
              <TableRow key={index}>
                <TableCell className="w-[100px] font-medium"><Heart /></TableCell>
                <TableCell className="flex items-center gap-1 font-medium">
                  <a className='flex items-center gap-1 font-medium w-full' href={`/coins/${coin.id}`}>
                    <img
                      className='h-8'
                      src={coin.image}
                      alt={`${coin.name} image`}
                    />
                    {coin.name}
                  </a>
                </TableCell>
                <TableCell>
                  <a className='flex items-center gap-1 font-medium w-full' href={`/coins/${coin.id}`}>
                    {coin.symbol}
                  </a>
                </TableCell>
                <TableCell>
                  <a className='flex items-center gap-1 font-medium w-full' href={`/coins/${coin.id}`}>
                    {formatNumber('currency', 'narrowSymbol').format(coin.current_price)}
                  </a>
                </TableCell>
                <TableCell className={`flex ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  <a className='flex items-center gap-1 font-medium w-full' href={`/coins/${coin.id}`}>
                    {coin.price_change_percentage_24h >= 0 ? <ChevronUp /> : <ChevronDown />}
                    {formatNumber('percent', 'narrowSymbol').format(coin.price_change_percentage_24h / 100)}
                  </a>
                </TableCell>
                <TableCell>
                  <a className='flex items-center gap-1 font-medium w-full' href={`/coins/${coin.id}`}>
                    {formatNumber('currency', 'narrowSymbol').format(coin.total_volume)}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  <a className='flex items-end justify-end gap-1 font-medium w-full' href={`/coins/${coin.id}`}>
                    {formatNumber('currency', 'narrowSymbol').format(coin.market_cap)}
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  )
}

export default App
