import { CoinLineChart } from "@/components/coinlinechart"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronDown, ChevronUp, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import coinService from "../services/coins"
import { formatNumber } from "@/services/formatNumber"
import { CoinDetailInterface } from "@/interfaces/coindetailinterface"
import { Skeleton } from "@/components/ui/skeleton"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addOrRemoveFavorite } from "@/redux/favorite/slice"
import { CoinInterface } from "@/interfaces/coinsInterface"

const CoinDetails = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const { favoriteCoins } = useAppSelector((state) => state.favorite)
    const [chartType, setChartType] = useState<'price' | 'market'>('price');
    const [chartData, setChartData] = useState();
    const [coinData, setCoinData] = useState<CoinDetailInterface>();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            coinService.getOneCoin(id).then((coin) => {
                setCoinData(coin?.data)
            }).catch((error) => { console.log(error) });

            coinService.getCoinChart(id, "usd").then((coinChart) => {
                setChartData(coinChart?.data)
            }).catch((error) => { console.log(error) });
        }
    }, [id])

    useEffect(() => {
        if (favoriteCoins) {
            setIsFavorite(favoriteCoins.find((favoriteCoin) => favoriteCoin.id === id) ? true : false);
        }
    }, [favoriteCoins, id])

    const handleAddToFavorite = (coinData: CoinDetailInterface) => {
        const { id, name, image, market_data } = coinData;
        const coinToAdd: CoinInterface = {
            id,
            name,
            image: image.large,
            current_price: market_data.current_price.usd,
            price_change_percentage_24h: market_data.price_change_percentage_24h,
            symbol: coinData.symbol,
            market_cap: market_data.market_cap.usd,
            total_volume: market_data.total_volume.usd,
            price_change_24h: market_data.price_change_24h
        };
        dispatch(addOrRemoveFavorite(coinToAdd))
    }

    return (
        <main className="flex max-md:flex-col items-center justify-center py-16 px-24 h-full gap-28">
            {coinData ? (<section id="coin-info" className="w-full md:w-[40%] h-full flex flex-col justify-around">
                <div className="flex flex-col gap-1">
                    <h1 className="flex items-center text-4xl font-bold">
                        <img
                            className='h-10'
                            src={coinData.image.large}
                            alt={`${coinData.name} image`}
                        />
                        {coinData?.name}
                    </h1>
                    <p className="text-3xl">{formatNumber("currency", "narrowSymbol").format(coinData.market_data.current_price.usd)}</p>
                    <p className="flex items-center text-2xl gap-2">
                        <span className={`flex items-center ${coinData.market_data.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {coinData.market_data.price_change_percentage_24h >= 0 ? <ChevronUp /> : <ChevronDown />}
                            {formatNumber('percent', 'narrowSymbol').format(coinData.market_data.price_change_percentage_24h / 100)}
                        </span>
                        <span className="rounded-xl bg-dark py-0.5 px-1">24h</span></p>
                </div>
                <Button onClick={() => handleAddToFavorite(coinData)} className="flex items-center bg-secondary hover:bg-light_blue text-xl font-bold py-6">
                    <Heart size={28} className={`${isFavorite ? 'fill-light_red text-light_red' : 'fill-none'}`} />Add to Favorites
                </Button>
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>High price 24h</span>
                        <span>{formatNumber('currency', 'narrowSymbol').format(coinData.market_data.high_24h.usd)}</span>
                    </p>
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>Low price 24</span>
                        <span>{formatNumber('currency', 'narrowSymbol').format(coinData.market_data.low_24h.usd)}</span>
                    </p>
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>Market Cap</span>
                        <span>{formatNumber('currency', 'narrowSymbol').format(coinData.market_data.market_cap.usd)}</span>
                    </p>
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>Fully Diluted Valuation</span>
                        <span>{formatNumber('currency', 'narrowSymbol').format(coinData.market_data.fully_diluted_valuation.usd)}</span>
                    </p>
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>Total Volume</span>
                        <span>{formatNumber('currency', 'narrowSymbol').format(coinData.market_data.total_volume.usd)}</span>
                    </p>
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>Circulating Supply</span>
                        <span>{formatNumber('currency', 'narrowSymbol').format(coinData.market_data.circulating_supply)}</span>
                    </p>
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>Total Supply</span>
                        <span>{formatNumber('currency', 'narrowSymbol').format(coinData.market_data.total_supply)}</span>
                    </p>
                    <p className="w-full flex items-center justify-between text-sm">
                        <span>Max Supply</span>
                        <span>{coinData.market_data.max_supply !== null ? formatNumber('currency', 'narrowSymbol').format(coinData.market_data.max_supply) : "∞"}</span>
                    </p>
                </div>
            </section>
            ) : (
                <div className="flex flex-col w-[40%] h-full space-y-3">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-full w-full rounded-xl" />
                </div>
            )}

            {chartData ? (<section id="coin-chart" className="w-full md:w-[60%] flex flex-col h-full justify-around">
                <Tabs defaultValue="account" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="account" onClick={() => setChartType("price")}>Price</TabsTrigger>
                        <TabsTrigger value="password" onClick={() => setChartType("market")}>Market Cap</TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">Chart by price change in the last 30 days</TabsContent>
                    <TabsContent value="password">Chart by market capitalization change in the last 30 days</TabsContent>
                </Tabs>
                <div>
                    <CoinLineChart apiData={chartData} chartType={chartType} />
                </div>

            </section>
            ) : (
                <div className="flex flex-col w-[60%] h-full space-y-3">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[80%]" />
                        <Skeleton className="h-4 w-full" />
                    </div>
                    <Skeleton className="h-full w-full rounded-xl" />
                </div>
            )}
        </main>
    )
}

export default CoinDetails