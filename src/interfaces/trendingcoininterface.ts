export interface TrendingCoinInterface {
    item: {
        id: string;
        name: string;
        symbol: string;
        thumb: string;
        data: {
            price: string;
            price_change_percentage_24h: { usd: number };
        }
        market_cap: number;
        total_volume: number;
    }
}