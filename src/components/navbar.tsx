import { BookOpenText, LogOut, Mail, Menu, Mic, Newspaper, Settings, SquareArrowUpRight, Wallet, Youtube } from "lucide-react"
import { Button } from "./ui/button"
import { CurrencyEth } from "@phosphor-icons/react"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "./ui/navigation-menu"
import { NavigationMenuList } from "@radix-ui/react-navigation-menu"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import walletService from "@/services/wallet"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addWalletAccount, removeWalletAccount } from "@/redux/wallet/slice"

export const Navbar = () => {
    const dispatch = useAppDispatch()
    const { wallet } = useAppSelector((state) => state.wallet)

    const [walletAccount, setWalletAccount] = useState<string>()
    const [balanceAccount, setBalanceAccount] = useState<string>()

    useEffect(() => {
        if (wallet) {
            setWalletAccount(wallet.address)
            setBalanceAccount(wallet.balance)
        }
    }, [wallet])

    const handleRequestAccount = () => {
        walletService.connectWallet().then((accounts) => {

            setWalletAccount(accounts[0]);
            const adress = accounts[0]

            walletService.getUserBalance(accounts[0]).then((balance: bigint) => {

                setBalanceAccount(ethers.formatEther(balance));
                const walletToAdd = {
                    address: String(adress),
                    balance: ethers.formatEther(balance)
                }
                dispatch(addWalletAccount(walletToAdd))
            });
        });
    }

    const handleDisconnectWallet = async () => {
        walletService.disconnectWallet().then(() => {
            dispatch(removeWalletAccount())
        })
    }

    return (
        <nav className="sticky top-0 z-10 w-full flex items-center justify-between bg-primary text-white py-4 px-16">
            <a href="/" className="flex items-center justify-center">
                <img src="/cryptocoffee-logo.png" className="h-8 -mt-2" alt="" />
                <p>CryptoCoffee</p>
            </a>

            <div className="w-[75%] hidden lg:flex justify-between items-center">
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-16 items-center">
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/coins">
                                Coins
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="/favorites" className="flex items-center justify-center gap-2">
                                Favorites
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="bg-none">Learn</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="flex flex-col p-4 md:w-[100px] lg:w-[200px] gap-4">
                                    <li><a href="#" className="flex items-center text-center"><BookOpenText /> Learn Crypt</a></li>
                                    <li><a href="#" className="flex items-center text-center"><Newspaper /> News</a></li>
                                    <li><a href="#" className="flex items-center text-center"><Youtube /> Videos</a></li>
                                    <li><a href="#" className="flex items-center text-center"><Mic />Podcast</a></li>
                                    <li><a href="#" className="flex items-center text-center"><Mail /> Newsletter</a></li>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink href="#" className="flex items-center justify-center gap-2">
                                Buy Crypto <SquareArrowUpRight />
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <div className="flex items-center gap-4">
                    {balanceAccount ? (
                        <p className="flex flex-col items-start justify-start text-left"><span>Balance: </span><span className="flex items-center justify-start text-left"><CurrencyEth className="h-4 w-4" size={0} />{balanceAccount}</span></p>
                    ) : (
                        <Button onClick={() => handleRequestAccount()} className="bg-white hover:bg-slate-200 text-black"><CurrencyEth className="h-8 w-8" size={0} />Ethereum</Button>
                    )}
                    {walletAccount ? (
                        <span className="flex gap-4 items-end">
                            <p className="flex flex-col items-center"><span>Account: </span>{walletAccount.substring(0, 6)}...</p>
                            <Button onClick={() => handleDisconnectWallet()} className="bg-secondary hover:bg-light_blue flex items-center justify-center text-center gap-1 font-bold">Disconnect<LogOut className="h-4 w-4 font-bold" /></Button>
                        </span>
                    ) : (
                        <Button onClick={() => handleRequestAccount()} className="bg-secondary hover:bg-light_blue rounded-lg"><Wallet className="h-6 w-6 mr-2" />Connect wallet</Button>
                    )}
                    <Button className="bg-white hover:bg-slate-200 text-black"><Settings /></Button>
                </div>
            </div>

            <Sheet>
                <SheetTrigger asChild className='flex lg:hidden'>
                    <Button variant="outline" className='bg-transparent border-none text-white'><Menu /></Button>
                </SheetTrigger>
                <SheetContent className='flex lg:hidden justify-center'>
                    <div className="w-full flex lg:hidden flex-col justify-center items-center">
                        <NavigationMenu>
                            <NavigationMenuList className="flex flex-col gap-16 items-center">
                                <NavigationMenuItem>
                                    <SheetClose asChild>
                                        <NavigationMenuLink href="/coins">
                                            Coins
                                        </NavigationMenuLink>
                                    </SheetClose>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <SheetClose asChild>
                                        <NavigationMenuLink href="/favorites" className="flex items-center justify-center gap-2">
                                            Favorites
                                        </NavigationMenuLink>
                                    </SheetClose>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger className="bg-none p-0">Learn</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="flex flex-col p-4 md:w-[100px] lg:w-[200px] gap-4">
                                            <li>
                                                <SheetClose asChild>
                                                    <a href="#" className="flex items-center text-center"><BookOpenText /> Learn Crypt</a>
                                                </SheetClose>
                                            </li>
                                            <li>
                                                <SheetClose asChild>
                                                    <a href="#" className="flex items-center text-center"><Newspaper /> News</a>
                                                </SheetClose>
                                            </li>
                                            <li>
                                                <SheetClose asChild>
                                                    <a href="#" className="flex items-center text-center"><Youtube /> Videos</a>
                                                </SheetClose>
                                            </li>
                                            <li>
                                                <SheetClose asChild>
                                                    <a href="#" className="flex items-center text-center"><Mic />Podcast</a>
                                                </SheetClose>
                                            </li>
                                            <li>
                                                <SheetClose asChild>
                                                    <a href="#" className="flex items-center text-center"><Mail /> Newsletter</a>
                                                </SheetClose>
                                            </li>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <SheetClose asChild>
                                        <NavigationMenuLink href="#" className="flex items-center justify-center gap-2">
                                            Buy Crypto <SquareArrowUpRight />
                                        </NavigationMenuLink>
                                    </SheetClose>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>

                        <div className="flex flex-col items-center justify-center gap-4">
                            {balanceAccount ? (
                                <p className="flex flex-col items-start justify-start text-left"><span>Balance: </span><span className="flex items-center justify-start text-left"><CurrencyEth className="h-4 w-4" size={0} />{balanceAccount}</span></p>
                            ) : (
                                <SheetClose asChild>
                                    <Button onClick={() => handleRequestAccount()} className="bg-white hover:bg-slate-200 text-black"><CurrencyEth className="h-8 w-8" size={0} />Ethereum</Button>
                                </SheetClose>
                            )}
                            {walletAccount ? (
                                <span className="flex flex-col gap-4 items-center">
                                    <p className="flex flex-col items-center"><span>Account: </span>{walletAccount.substring(0, 6)}...</p>
                                    <Button onClick={() => handleDisconnectWallet()} className="bg-secondary hover:bg-light_blue flex items-center justify-center text-center gap-1 font-bold">Disconnect<LogOut className="h-4 w-4 font-bold" /></Button>
                                </span>
                            ) : (
                                <Button onClick={() => handleRequestAccount()} className="bg-secondary hover:bg-light_blue rounded-lg"><Wallet className="h-6 w-6 mr-2" />Connect wallet</Button>
                            )}
                            <SheetClose asChild>
                                <Button className="bg-white hover:bg-slate-200 text-black"><Settings /></Button>
                            </SheetClose>
                        </div>
                    </div>

                </SheetContent>
            </Sheet>
        </nav>
    )
}
