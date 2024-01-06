import { useState } from 'react';
import { NumberInput, TextInput } from '@mantine/core';
import { useInputState } from '@mantine/hooks';

function WithUseInputState() {
  const [stringValue, setStringValue] = useInputState('');
  const [numberValue, setNumberValue] = useInputState(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={setStringValue}
      />
      <TextInput value={stringValue} onChange={setStringValue} />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}

function WithUseState() {
  const [stringValue, setStringValue] = useState('');
  const [numberValue, setNumberValue] = useState(0);

  return (
    <>
      <input
        type="text"
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <TextInput
        value={stringValue}
        onChange={(event) =>
          setStringValue(event.currentTarget.value)
        }
      />
      <NumberInput value={numberValue} onChange={setNumberValue} />
    </>
  );
}

export default WithUseInputState