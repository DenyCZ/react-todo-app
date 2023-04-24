export type Pokemon = {
    sprites: {
        front_default: string
    }
    id: number
    name: string
    types: PokemonType[]
    abilities: PokemonAbility[]
}

type PokemonType = { slot: number; type: { name: string; url: string } }

type PokemonAbility = {
    ability: { name: string; url: string }
    is_hidden: boolean
    slot: number
}
