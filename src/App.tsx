import type { Pokemon } from "./types";

import { useCallback, useEffect, useState } from "react";

import { POKEMONS } from "./constants";
import PokemonCard from "./PokemonCard";

function App() {
  const [cart, setCart] = useState<Pokemon[]>(() => {
    return JSON.parse(localStorage.getItem("carrito")) || {};
  });

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(cart));
  }, [cart]);

  const onAdd = useCallback((pokemon) => {
    setCart((cart) => {
      const newCart = { ...cart, [pokemon.name]: { ...pokemon, cantidad: 1 } };
      return newCart;
    });
  }, []);

  const incrementar = useCallback(
    (pokemon) =>
      setCart((cart) => {
        const inCart = cart[pokemon.name];
        if (inCart) {
          return {
            ...cart,
            [pokemon.name]: {
              ...cart[pokemon.name],
              cantidad: cart[pokemon.name].cantidad + 1,
            },
          };
        } else {
          return cart;
        }
      }),
    []
  );

  const decrementar = useCallback(
    (pokemon) =>
      setCart((cart) => {
        const inCart = cart[pokemon.name];
        if (inCart) {
          return {
            ...cart,
            [pokemon.name]: {
              ...cart[pokemon.name],
              cantidad: cart[pokemon.name].cantidad - 1,
            },
          };
        } else {
          return cart;
        }
      }),
    []
  );

  return (
    <>
      <nav>
        <input
          className="nes-input"
          id="name_field"
          placeholder="Charmander"
          type="text"
        />
      </nav>
      <section>
        {POKEMONS.map((pokemon) => {
          const isInCart = cart[pokemon.name];
          if (isInCart) {
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onAdd={onAdd}
                inCart={isInCart}
                incrementar={incrementar}
                decrementar={decrementar}
              />
            );
          } else {
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onAdd={onAdd}
                inCart="null"
                incrementar={incrementar}
                decrementar={decrementar}
              />
            );
          }
        })}
      </section>
      <aside>
        <button className="nes-btn is-primary">0 items (total $0)</button>
      </aside>
    </>
  );
}

export default App;
