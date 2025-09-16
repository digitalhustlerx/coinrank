
import React, { useState, useEffect, useRef } from 'react';
import { BitcoinIcon } from '../Icons';

declare const TradingView: any;

// Helper function to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate initial mock data for the order book
const generateOrderBookData = (midPrice: number, count: number) => {
    const asks = [];
    const bids = [];
    for (let i = 1; i <= count; i++) {
        asks.push({
            price: midPrice + i * 0.1,
            amount: getRandom(0.01, 0.5),
        });
        bids.push({
            price: midPrice - i * 0.1,
            amount: getRandom(0.01, 0.5),
        });
    }
    // Sort asks ascending, bids descending
    asks.sort((a, b) => a.price - b.price);
    bids.sort((a, b) => b.price - a.price);
    return { asks, bids };
};

const TradePage: React.FC = () => {
    const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
    const [orderType, setOrderType] = useState<'limit' | 'market' | 'stop-limit'>('limit');
    
    // Form state
    const [price, setPrice] = useState('64350.50');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState('');

    const midPrice = 64350.5;
    const [orderBook, setOrderBook] = useState(generateOrderBookData(midPrice, 8));
    const [tradeHistory, setTradeHistory] = useState<any[]>([]);

    const widgetInitialized = useRef(false);

    // TradingView Widget initialization
    useEffect(() => {
        if (typeof TradingView !== 'undefined' && !widgetInitialized.current && document.getElementById('tradingview_chart_container')) {
            new TradingView.widget({
                "autosize": true,
                "symbol": "BINANCE:BTCUSDT",
                "interval": "60",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "enable_publishing": false,
                "hide_side_toolbar": false,
                "allow_symbol_change": true,
                "container_id": "tradingview_chart_container"
            });
            widgetInitialized.current = true;
        }
    }, []);

    // Real-time data simulation for Order Book and Trade History
    useEffect(() => {
        const orderBookInterval = setInterval(() => {
            setOrderBook(prev => {
                const newAsks = prev.asks.map(ask => ({ ...ask, amount: Math.max(0.01, ask.amount + getRandom(-0.05, 0.05)) }));
                const newBids = prev.bids.map(bid => ({ ...bid, amount: Math.max(0.01, bid.amount + getRandom(-0.05, 0.05)) }));
                return { asks: newAsks, bids: newBids };
            });
        }, 1500);

        const tradeHistoryInterval = setInterval(() => {
            const newTrade = {
                price: midPrice + getRandom(-1, 1),
                amount: getRandom(0.01, 0.2),
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                type: Math.random() > 0.5 ? 'buy' : 'sell'
            };
            setTradeHistory(prev => [newTrade, ...prev.slice(0, 19)]);
        }, 2000);

        return () => {
            clearInterval(orderBookInterval);
            clearInterval(tradeHistoryInterval);
        };
    }, []);
    
    // Update total when price or amount changes
    useEffect(() => {
        const numericAmount = parseFloat(amount);
        const numericPrice = parseFloat(price);
        if (!isNaN(numericAmount) && !isNaN(numericPrice) && numericAmount > 0) {
            setTotal((numericAmount * numericPrice).toFixed(2));
        } else {
            setTotal('');
        }
    }, [price, amount]);


    const mockOpenOrders = [
        { id: 1, type: 'Buy', price: '64100.00', amount: '0.05', total: '3205.00' },
        { id: 2, type: 'Sell', price: '64800.00', amount: '0.1', total: '6480.00' },
    ];

    const OrderTypeButton: React.FC<{ type: 'limit' | 'market' | 'stop-limit', children: React.ReactNode }> = ({ type, children }) => (
        <button
            onClick={() => setOrderType(type)}
            className={`px-3 py-1 text-sm rounded transition-colors ${orderType === type ? 'bg-white/10 text-white' : 'text-light-gray hover:bg-white/5'}`}
        >
            {children}
        </button>
    );

    const OrderBookRow = ({ price, amount, type, totalDepth }: { price: number, amount: number, type: 'buy' | 'sell', totalDepth: number }) => {
        const total = price * amount;
        const depth = (total / totalDepth) * 100;
        const color = type === 'buy' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)';

        return (
            <div className="relative flex justify-between items-center text-xs py-1 px-2 font-mono">
                <div 
                    className="absolute top-0 right-0 h-full" 
                    style={{ width: `${depth}%`, backgroundColor: color }}
                />
                <span className={`z-10 w-1/3 text-left ${type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>{price.toFixed(2)}</span>
                <span className="z-10 w-1/3 text-right text-white">{amount.toFixed(4)}</span>
                <span className="z-10 w-1/3 text-right text-light-gray">{total.toFixed(2)}</span>
            </div>
        )
    };
    
    const totalAsksDepth = orderBook.asks.reduce((sum, order) => sum + (order.price * order.amount), 0);
    const totalBidsDepth = orderBook.bids.reduce((sum, order) => sum + (order.price * order.amount), 0);
    const maxDepth = Math.max(totalAsksDepth, totalBidsDepth);
    
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                 <div className="flex items-center space-x-4">
                    <BitcoinIcon className="w-10 h-10"/>
                    <div>
                        <h1 className="text-2xl font-bold text-white">BTC/USDT</h1>
                        <p className="text-sm text-light-gray">Bitcoin</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-bold text-green-400">$64,345.12</p>
                    <p className="text-sm text-green-400">+1.25%</p>
                </div>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Column */}
                <div className="flex-[3] flex flex-col gap-6">
                    <div className="bg-dark-card border border-dark-border rounded-xl p-1 h-[300px] md:h-[500px]">
                        <div id="tradingview_chart_container" className="h-full"></div>
                    </div>
                    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4">Open Orders ({mockOpenOrders.length})</h3>
                        {mockOpenOrders.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm min-w-[500px]">
                                    <thead>
                                        <tr className="border-b border-dark-border text-light-gray">
                                            <th className="py-2 px-3 font-normal">Type</th>
                                            <th className="py-2 px-3 font-normal">Price (USDT)</th>
                                            <th className="py-2 px-3 font-normal">Amount (BTC)</th>
                                            <th className="py-2 px-3 font-normal">Total (USDT)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mockOpenOrders.map(order => (
                                            <tr key={order.id} className="border-b border-dark-border last:border-b-0 hover:bg-white/5">
                                                <td className={`py-3 px-3 font-medium ${order.type === 'Buy' ? 'text-green-400' : 'text-red-500'}`}>{order.type}</td>
                                                <td className="py-3 px-3 text-white">{order.price}</td>
                                                <td className="py-3 px-3 text-white">{order.amount}</td>
                                                <td className="py-3 px-3 text-white">{order.total}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-light-gray text-sm text-center py-4">No open orders to display.</p>
                        )}
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex-[1] flex flex-col gap-6">
                    {/* Buy/Sell Form */}
                    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <div className="flex border-b border-dark-border mb-4">
                            <button onClick={() => setTradeType('buy')} className={`w-1/2 pb-2 font-bold transition-colors ${tradeType === 'buy' ? 'text-green-400 border-b-2 border-green-400' : 'text-light-gray hover:text-white'}`}>Buy</button>
                            <button onClick={() => setTradeType('sell')} className={`w-1/2 pb-2 font-bold transition-colors ${tradeType === 'sell' ? 'text-red-500 border-b-2 border-red-500' : 'text-light-gray hover:text-white'}`}>Sell</button>
                        </div>
                        <div className="flex space-x-2 mb-4">
                            <OrderTypeButton type="limit">Limit</OrderTypeButton>
                            <OrderTypeButton type="market">Market</OrderTypeButton>
                            <OrderTypeButton type="stop-limit">Stop-Limit</OrderTypeButton>
                        </div>
                        <div className="space-y-4">
                            {orderType !== 'market' && (
                                <div>
                                    <label className="text-xs text-light-gray">Price (USDT)</label>
                                    <input type="text" value={price} onChange={e => setPrice(e.target.value)} className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue" />
                                </div>
                            )}
                            <div>
                                <label className="text-xs text-light-gray">Amount (BTC)</label>
                                <input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-blue" />
                            </div>
                            <div>
                                <label className="text-xs text-light-gray">Total (USDT)</label>
                                <input type="number" placeholder="0.00" value={total} readOnly className="w-full mt-1 bg-dark-bg border border-dark-border rounded-md p-2 text-white/70 cursor-not-allowed" />
                            </div>
                            <div className="text-xs text-light-gray flex justify-between">
                                <span>Available:</span>
                                <span>{tradeType === 'buy' ? '2,356.12 USDT' : '0.5000 BTC'}</span>
                            </div>
                            <button className={`w-full py-3 rounded-lg font-bold transition-colors ${tradeType === 'buy' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                                {tradeType === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                            </button>
                        </div>
                    </div>

                    {/* Order Book */}
                    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                        <h4 className="text-lg font-bold text-white mb-3">Order Book</h4>
                        <div className="flex justify-between text-xs text-light-gray mb-2 px-2">
                            <span className="w-1/3 text-left">Price</span>
                            <span className="w-1/3 text-right">Amount</span>
                            <span className="w-1/3 text-right">Total</span>
                        </div>
                        <div className="space-y-0.5">
                            {orderBook.asks.map((order, i) => <OrderBookRow key={i} price={order.price} amount={order.amount} type="sell" totalDepth={maxDepth} />)}
                        </div>
                        <div className="py-2 text-center text-lg font-bold text-green-400 my-1 border-y border-dark-border">
                            {midPrice.toFixed(2)} USDT
                        </div>
                        <div className="space-y-0.5">
                            {orderBook.bids.map((order, i) => <OrderBookRow key={i} price={order.price} amount={order.amount} type="buy" totalDepth={maxDepth} />)}
                        </div>
                    </div>

                    {/* Trade History */}
                    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
                         <h4 className="text-lg font-bold text-white mb-3">Trade History</h4>
                         <div className="flex justify-between text-xs text-light-gray mb-2 px-2">
                            <span className="w-1/3 text-left">Price</span>
                            <span className="w-1/3 text-right">Amount</span>
                            <span className="w-1/3 text-right">Time</span>
                        </div>
                        <div className="space-y-1 h-48 overflow-y-auto">
                            {tradeHistory.map((trade, i) => (
                                <div key={i} className="flex justify-between items-center text-xs py-0.5 px-2 font-mono">
                                    <span className={`w-1/3 text-left ${trade.type === 'buy' ? 'text-green-400' : 'text-red-500'}`}>{trade.price.toFixed(2)}</span>
                                    <span className="w-1/3 text-right text-white">{trade.amount.toFixed(4)}</span>
                                    <span className="w-1/3 text-right text-light-gray">{trade.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradePage;
