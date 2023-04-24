import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import { PokemonBase } from './type/PokemonBase'
import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Pokemon } from './type/Pokemon'

interface CardProps {
    handleModalOpen: (pokemonData: Pokemon) => void
    pokeData: PokemonBase
}

const PokemonCard = ({ handleModalOpen, pokeData }: CardProps) => {
    const [pokemonInfo, setPokemonInfo] = useState<Pokemon>({} as Pokemon)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const hydrate = async () => {
            setLoading(true)
            const { data } = await axios.get(pokeData.url)
            setPokemonInfo(data)
            setLoading(false)
        }

        hydrate()
    }, [pokeData.url])

    const pokemonId = useMemo(() => {
        return `#${pokemonInfo?.id?.toString().padStart(3, '0') ?? '000'}`
    }, [pokemonInfo])

    return (
        <Card sx={{ maxWidth: 480 }} onClick={() => handleModalOpen(pokemonInfo)}>
            {loading ? (
                <>Loading...</>
            ) : (
                <>
                    <CardHeader title={pokeData.name} subheader={pokemonId} />
                    <CardMedia
                        component="img"
                        height="194"
                        image={pokemonInfo?.sprites?.front_default}
                        alt={pokeData.name}
                    />
                </>
            )}
        </Card>
    )
}

export default PokemonCard
