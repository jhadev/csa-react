import React, { useState, useEffect } from 'react';
import './App.css';
import { Flex, Box } from '@chakra-ui/core';

function App() {
  function* gen(arr) {
    yield* arr;
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [selected, setSelected] = useState(null);
  const [genned, setGenned] = useState(gen(items));

  useEffect(() => {
    async function stepThrough() {
      await delay(2000);

      const next = genned.next().value;

      console.log(next);

      if (next) {
        setSelected(next);
        console.log(selected);
      } else {
        setSelected('The End');
      }
    }

    stepThrough();
  }, [selected, genned]);

  return (
    <main>
      <Flex align="center" justify="center">
        {selected ? (
          <Box bg="tomato" w="50%" p={4} color="white">
            {selected}
          </Box>
        ) : (
          <h2>Hi!</h2>
        )}
      </Flex>
    </main>
  );
}

export default App;
