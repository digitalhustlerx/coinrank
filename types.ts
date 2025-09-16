
export interface CryptoCoin {
  id: string;
  rank: number;
  name: string;
  ticker: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  price: number;
  change24h: number;
  marketCap: string;
  volume24h: string;
  circulatingSupply: string;
  priceGraphData: { value: number }[];
}
