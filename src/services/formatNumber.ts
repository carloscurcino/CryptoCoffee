interface CustomNumberFormatOptions extends Intl.NumberFormatOptions {
    roundingMode?: string;
}

export const formatNumber = (style: string, currencyDisplay: string) => {
    const options: CustomNumberFormatOptions = {
        style: style,
        currency: 'USD',
        currencyDisplay: currencyDisplay,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        roundingMode: 'floor', // Adicionando a propriedade roundingMode para evitar erro do typescript
    };
    return new Intl.NumberFormat('en-US', options);
};