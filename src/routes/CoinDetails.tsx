import { useParams } from "react-router-dom"

const CoinDetails = () => {
    const { id } = useParams()
    return (
        <div>CoinDetails: {id}</div>
    )
}

export default CoinDetails