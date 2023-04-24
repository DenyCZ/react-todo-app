import { Box, Button, Container, Grid, Modal, Typography } from '@mui/material'
import PokemonCard from '@/components/pokemon-card/PokemonCard'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PokemonBase } from '@/components/pokemon-card/type/PokemonBase'
import { Pokemon as PokemonType } from '@/components/pokemon-card/type/Pokemon'

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    outline: 'none',
    p: 4,
}

const PokemonPage = () => {
    const [nextUri, setNextUri] = useState('https://pokeapi.co/api/v2/pokemon?limit=40')
    const [results, setResults] = useState<PokemonBase[]>([])
    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false)
    const [modalPokemon, setModalPokemon] = useState({} as PokemonType)
    const handleOpen = (pokemonData: PokemonType) => {
        setModalPokemon(pokemonData)
        setOpen(true)
    }
    const handleClose = () => setOpen(false)

    const fetchData = async () => await axios.get(nextUri)

    useEffect(() => {
        const fetchPokemons = async () => {
            const { data } = await fetchData()

            setResults(data.results)
            setNextUri(data.next)
        }

        fetchPokemons()
    }, [])

    const loadMore = async () => {
        if (loading) return

        setLoading(true)

        const { data } = await fetchData()

        setResults((oldState) => {
            return [...oldState, ...data.results]
        })
        setNextUri(data.next)

        setLoading(false)
    }

    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <Container maxWidth="xl" sx={{ padding: '1rem' }}>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyle}>
                    <Typography variant="h6" component="h2">
                        {capitalize(modalPokemon?.name ?? '')}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Types: {modalPokemon?.types?.map((type) => type.type.name).join(', ') ?? ''}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        Abilities: {modalPokemon?.abilities?.map((type) => type.ability.name).join(', ') ?? ''}
                    </Typography>
                </Box>
            </Modal>

            <Grid container spacing={2}>
                {results?.map((result: PokemonBase) => (
                    <Grid item key={result.name}>
                        <PokemonCard pokeData={result} handleModalOpen={(data) => handleOpen(data)} />
                    </Grid>
                ))}
            </Grid>
            <Button sx={{ marginTop: '2rem' }} variant="contained" onClick={loadMore}>
                Load more...
            </Button>
        </Container>
    )
}

export default PokemonPage
