import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CoinInterface } from '@/interfaces/coinsInterface'
import { addOrRemoveFavorite } from '@/redux/favorite/slice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { formatNumber } from '@/services/formatNumber'
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp, Filter, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import coinService from "../services/coins"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from '@/components/ui/select'


const Coins = () => {
    const dispatch = useAppDispatch()
    const { favoriteCoins } = useAppSelector((state) => state.favorite)
    const [coins, setCoins] = useState<CoinInterface[]>([])
    const [page, setPage] = useState<number>(1)
    const [pageList, setPageList] = useState<number[]>([1])
    const [filter, setFilter] = useState<'market_cap_desc' | 'market_cap_asc' | 'volume_asc' | 'volume_desc' | 'id_asc' | 'id_desc'>()

    const handleAddToFavorite = (coin: CoinInterface) => {
        dispatch(addOrRemoveFavorite(coin))
    }

    useEffect(() => { console.log(filter) }, [filter])

    useEffect(() => {
        coinService.getAllCoins("usd", page, filter).then((coins) => {
            setCoins(coins?.data)
        }).catch((err) => console.error(err));
    }, [filter, page])

    const handlePrevPage = () => {
        if (page < 10) {
            setPageList(prevPageList => prevPageList.filter(pageNum => pageNum !== page))
            setPage(page - 1)
        }
    }

    const handlePageChange = (page: number) => {
        // Atualiza a página
        setPage(page);

        // Atualiza a lista de páginas para incluir apenas as páginas até a página selecionada
        setPageList(prevPageList => prevPageList.filter(pageNum => pageNum <= page));
    }
    const handleNextPage = () => {
        setPageList(prevPageList => [...prevPageList, page + 1])
        setPage(page + 1)
    }

    return (
        <main id='top-list' className='p-6 md:p-24'>
            <div className='flex justify-between items-center'>
                <h2 className='font-bold text-2xl mb-3'>All Coins</h2>
                <Select onValueChange={(e) => setFilter(e as 'market_cap_desc' | 'market_cap_asc' | 'volume_asc' | 'volume_desc' | 'id_asc' | 'id_desc')}>
                    <SelectTrigger className="bg-secondary items-center w-12 p-0">
                        <Filter />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Select filter</SelectLabel>
                            <SelectItem className='flex flex-row' value="market_cap_desc">Market Cap <ArrowDown className='h-8' /></SelectItem>
                            <SelectItem className='flex flex-row' value="market_cap_asc">Market Cap <ArrowUp className='h-8' /></SelectItem>
                            <SelectItem className='flex flex-row' value="volume_desc">Volume <ArrowDown className='h-8' /></SelectItem>
                            <SelectItem className='flex flex-row' value="volume_asc">Volume <ArrowUp className='h-8' /></SelectItem>
                            <SelectItem className='flex flex-row' value="id_desc">ID <ArrowDown className='h-8' /></SelectItem>
                            <SelectItem className='flex flex-row' value="id_asc">ID <ArrowUp className='h-8' /></SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
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

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious className='cursor-pointer' onClick={() => handlePrevPage()} />
                    </PaginationItem>
                    <PaginationItem>
                        {pageList.map((pageNum, index) => <PaginationLink key={index} className={`cursor-pointer ${page === pageNum && 'bg-secondary'}`} onClick={() => handlePageChange(pageNum)} >{pageNum}</PaginationLink>)}
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext className='cursor-pointer' onClick={() => handleNextPage()} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </main>
    )
}

export default Coins