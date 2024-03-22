import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CoinInterface } from '@/interfaces/coinsInterface'
import { addOrRemoveFavorite } from '@/redux/favorite/slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { formatNumber } from '@/services/formatNumber'
import { ChevronDown, ChevronUp, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'


const Coins = () => {
    const dispatch = useAppDispatch()
    const { favoriteCoins } = useAppSelector((state) => state.favorite)
    const [coins, setCoins] = useState<CoinInterface[]>([])

    const handleAddToFavorite = (coin: CoinInterface) => {
        dispatch(addOrRemoveFavorite(coin))
    }

    useEffect(() => {
        if (favoriteCoins) {
            setCoins(favoriteCoins.slice(0, 3))
        }
    }, [favoriteCoins])

    return (
        <main id='top-list' className='p-6 md:p-24'>
            <h2 className='font-bold text-2xl mb-3'>Favorite Coins</h2>
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
                    {coins && coins.map((coin, index) => (
                        <TableRow key={index}>
                            <TableCell className="w-[100px] font-medium">
                                <Heart className={`cursor-pointer ${favoriteCoins.find((favoriteCoin) => favoriteCoin.id === coin.id) && 'fill-light_red text-light_red'}`} onClick={() => handleAddToFavorite(coin)} />
                            </TableCell>
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
        </main>
    )
}

export default Coins