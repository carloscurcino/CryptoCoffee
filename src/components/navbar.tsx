import { BookOpenText, Mail, Mic, Newspaper, Settings, SquareArrowUpRight, Wallet, Youtube } from "lucide-react"
import { Button } from "./ui/button"
import { CurrencyEth } from "@phosphor-icons/react"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "./ui/navigation-menu"
import { NavigationMenuList } from "@radix-ui/react-navigation-menu"

export const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between bg-primary text-white py-4 px-16">
            <div className="flex items-center justify-center">
                <img src="src/assets/cryptocoffee-logo.png" className="h-8 -mt-2" alt="" />
                <p>CryptoCoffee</p>
            </div>
            {/* <ul className="flex gap-16 items-center">
                <li><a href="#" className="flex items-center text-center">Trade</a></li>
                <li><a href="#" className="flex items-center text-center gap-2">DAO <ChevronDown /></a></li>
                <li><a href="#" className="flex items-center text-center">Earn</a></li>
                <li><a href="#" className="flex items-center justify-center gap-2">Bay Crypto <SquareArrowUpRight /></a></li>
            </ul> */}

            <NavigationMenu>
                <NavigationMenuList className="flex gap-16 items-center">
                    <NavigationMenuItem>
                        <a href="#">
                            <NavigationMenuLink>
                                Trade
                            </NavigationMenuLink>
                        </a>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-none">Lean</NavigationMenuTrigger>
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
                        <a href="#">
                            <NavigationMenuLink className="flex items-center justify-center gap-2">
                                Earn
                            </NavigationMenuLink>
                        </a>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <a href="#">
                            <NavigationMenuLink className="flex items-center justify-center gap-2">
                                Buy Crypto <SquareArrowUpRight />
                            </NavigationMenuLink>
                        </a>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-4">
                <Button className="bg-white hover:bg-slate-200 text-black"><CurrencyEth className="h-8 w-8" size={0} />Ethereum</Button>
                <Button className="bg-secondary hover:bg-light_blue rounded-lg"><Wallet className="h-6 w-6 mr-2" />Connect wallet</Button>
                <Button className="bg-white hover:bg-slate-200 text-black"><Settings /></Button>
            </div>
        </nav>
    )
}
