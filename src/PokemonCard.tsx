import type { Pokemon } from "./types";
import React from "react";

type PokemonCardProps = {
  pokemon: Pokemon;
  onAdd: (pokemon: Pokemon) => void;
  incrementar: (pokemon: Pokemon) => void;
  decrementar: (pokemon: Pokemon) => void;
};

function PokemonCard({
  pokemon,
  onAdd,
  inCart,
  incrementar,
  decrementar,
}: PokemonCardProps) {
  console.log("Se re-renderiza", pokemon.name);

  return (
    <article key={pokemon.id}>
      <img className="nes-container" src={pokemon.image} />
      <div>
        <p>{pokemon.name}</p>
        <p>{pokemon.description}</p>
      </div>

      {inCart?.name ? (
        <>
          <button className="nes-btn" onClick={() => incrementar(pokemon)}>
            Incrementar
          </button>
          {inCart?.cantidad}
          <button className="nes-btn" onClick={() => decrementar(pokemon)}>
            Decrementar
          </button>
        </>
      ) : (
        <button className="nes-btn" onClick={() => onAdd(pokemon)}>
          Agregar
        </button>
      )}
    </article>
  );
}

export default React.memo(PokemonCard);
