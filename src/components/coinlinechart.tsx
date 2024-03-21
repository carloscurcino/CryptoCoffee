import { formatNumber } from '@/services/formatNumber';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface ChartDataProps {
    timestamp: string;
    value: number;
    type: string; // Adicionando uma propriedade para o tipo de dado (price ou market_cap)
}

interface Props {
    apiData: {
        prices: number[][];
        market_caps: number[][];
        total_volumes: number[][];
    };
    chartType: 'price' | 'market';
}

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> { // Definindo a interface CustomTooltipProps
    type: string;
}

export const CoinLineChart: React.FC<Props> = ({ apiData, chartType }) => {
    const getChartData = (): ChartDataProps[] => {
        const formatDate = (timestamp: number): string => {
            const date = new Date(timestamp);
            const day = date.getDate(); // Obtendo o dia do mês (1-31)
            const month = date.getMonth() + 1; // Obtendo o mês (0-11, adicionamos 1 para obter 1-12)

            // Formatando a data como "DD/MM"
            return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
        };

        if (chartType === 'price') {
            return apiData.prices.map(([timestamp, value]) => ({
                timestamp: formatDate(timestamp),
                value,
                type: 'Price' // Definindo o tipo como 'Price'
            }));
        } else {
            return apiData.market_caps.map(([timestamp, value]) => ({
                timestamp: formatDate(timestamp),
                value,
                type: 'Market Cap' // Definindo o tipo como 'Market Cap'
            }));
        }
    };

    const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, type }) => { // Adicionando type como prop
        if (active && payload && payload.length) {
            const { value } = payload[0];
            return (
                <div className="p-4 bg-primary border border-secondary flex flex-col gap-4 rounded-xl">
                    <p className='text-sm text-light_blue'>{`Date: ${label}`}</p>
                    <p className='text-sm text-light_blue'>{`${type}: ${formatNumber('currency', 'narrowSymbol').format(Number(value))}`}</p>
                </div>
            );
        }

        return null;
    };

    const formatYAxisValue = (value: number) => {
        return formatNumber('currency', 'narrowSymbol').format(value);
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                width={500}
                height={300}
                data={getChartData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
                <YAxis orientation="right" tickFormatter={formatYAxisValue} tick={{ fontSize: 10 }} />
                <Tooltip content={<CustomTooltip type={chartType === 'price' ? 'Price' : 'Market Cap'} />} /> // Passando o tipo dinâmico
                <Line dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};
