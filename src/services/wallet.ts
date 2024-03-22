import { BrowserProvider } from "ethers"

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ethereum?: any
    }
}


const getUserBalance = (walletAccountAdress: string) => {
    const browserProvider = new BrowserProvider(window.ethereum);
    return browserProvider.getBalance(walletAccountAdress, "latest")
}

const connectWallet = async () => {
    if (window.ethereum) {

        const browserProvider = new BrowserProvider(window.ethereum);

        return await browserProvider.send("eth_requestAccounts", []).catch((e: Error) => { console.log(e) });
    }
}

const disconnectWallet = async () => {
    if (window.ethereum) {
        const browserProvider = new BrowserProvider(window.ethereum);
        await browserProvider.send("eth_requestAccounts", [{ eth_accounts: {} }]).catch((e: Error) => { console.log(e) })
    }
}

export default { getUserBalance, connectWallet, disconnectWallet }