export interface CoinDetailInterface {
    id: string;
    name: string;
    symbol: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_data: {
        current_price: { usd: number };
        market_cap: { usd: number };
        total_volume: { usd: number };
        price_change_24h: number;
        price_change_percentage_24h: number;
        fully_diluted_valuation: { usd: number }
        circulating_supply: number;
        total_supply: number;
        max_supply: number;
    }
}