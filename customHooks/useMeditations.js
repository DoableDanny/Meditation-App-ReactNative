import {useState, useEffect} from 'react';
import {getData, storeData} from '../functionsAndQuotes/asyncStorageFunctions';

const initialState = [
  {
    id: 0,
    title: 'Conclusions',
    locked: false,
    completionTime: 0,
  },
  {
    id: 1,
    title: 'The Guru',
    locked: true,
    completionTime: 0,
  },
  {
    id: 2,
    title: 'The Past',
    locked: true,
    completionTime: 0,
  },
  {
    id: 3,
    title: 'The Future',
    locked: true,
    completionTime: 0,
  },
  {
    id: 4,
    title: 'The Present',
    locked: true,
    completionTime: 0,
  },
  {id: 5, title: 'Overload', locked: true, completionTime: 0},
  {
    id: 6,
    title: 'Nervousness',
    locked: true,
    completionTime: 0,
  },
  {id: 7, title: 'Seeing', locked: true, completionTime: 0},
  {
    id: 8,
    title: 'Avoidance',
    locked: true,
    completionTime: 0,
  },
  {id: 9, title: 'Desire', locked: true, completionTime: 0},
  {
    id: 10,
    title: 'Conditioning',
    locked: true,
    completionTime: 0,
  },
  {id: 11, title: 'Memory', locked: true, completionTime: 0},
  {
    id: 12,
    title: 'Living as We Are',
    locked: true,
    completionTime: 0,
  },
  {
    id: 13,
    title: 'Meditation',
    locked: true,
    completionTime: 0,
  },
  {
    id: 14,
    title: 'Understanding Oneself',
    locked: true,
    completionTime: 0,
  },
  {id: 15, title: 'Muscles', locked: true, completionTime: 0},
  {
    id: 16,
    title: 'Perception',
    locked: true,
    completionTime: 0,
  },
  {
    id: 17,
    title: 'Truth',
    locked: true,
    completionTime: 0,
  },
  {id: 18, title: 'Noise', locked: true, completionTime: 0},
  {
    id: 19,
    title: 'Habits',
    locked: true,
    completionTime: 0,
  },
  {id: 20, title: 'Death', locked: true, completionTime: 0},
  {
    id: 21,
    title: 'Respectability',
    locked: true,
    completionTime: 0,
  },
  {id: 22, title: 'Desire', completionTime: 0, locked: true},
  {
    id: 23,
    title: 'Conditioning',
    completionTime: 0,
    locked: true,
  },
  {id: 24, title: 'Memory', completionTime: 0, locked: true},
  {
    id: 25,
    title: 'Living as We Are',
    completionTime: 0,
    locked: true,
  },
  {
    id: 26,
    title: 'Meditation',
    completionTime: 0,
    locked: true,
  },
  {
    id: 27,
    title: 'Understanding Oneself',
    completionTime: 0,
    locked: true,
  },
  {id: 28, title: 'Muscles', completionTime: 0, locked: true},
  {
    id: 29,
    title: 'Perception',
    completionTime: 0,
    locked: true,
  },
  {
    id: 30,
    title: 'Truth',
    completionTime: 0,
    locked: true,
  },
  {id: 31, title: 'Noise', completionTime: 0, locked: true},
  {
    id: 32,
    title: 'Habits',
    completionTime: 0,
    locked: true,
  },
  {id: 33, title: 'Death', completionTime: 0, locked: true},
  {
    id: 34,
    title: 'Respectability',
    completionTime: 0,
    locked: true,
  },
  {id: 35, title: 'Desire', completionTime: 0, locked: true},
  {
    id: 36,
    title: 'Conditioning',
    completionTime: 0,
    locked: true,
  },
  {id: 37, title: 'Memory', locked: true},
  {
    id: 38,
    title: 'Living as We Are',
    completionTime: 0,
    locked: true,
  },
  {
    id: 39,
    title: 'Meditation',
    completionTime: 0,
    locked: true,
  },
  {
    id: 40,
    title: 'Understanding Oneself',
    completionTime: 0,
    locked: true,
  },
  {id: 41, title: 'Muscles', completionTime: 0, locked: true},
  {
    id: 42,
    title: 'Perception',
    completionTime: 0,
    locked: true,
  },
  {
    id: 43,
    title: 'Truth',
    completionTime: 0,
    locked: true,
  },
  {id: 44, title: 'Noise', completionTime: 0, locked: true},
  {
    id: 45,
    title: 'Habits',
    completionTime: 0,
    locked: true,
  },
  {id: 46, title: 'Death', completionTime: 0, locked: true},
  {
    id: 47,
    title: 'Respectability',
    completionTime: 0,
    locked: true,
  },
  {id: 48, title: 'Desire', completionTime: 0, locked: true},
  {
    id: 49,
    title: 'Conditioning',
    completionTime: 0,
    locked: true,
  },
  {id: 50, title: 'Memory', completionTime: 0, locked: true},
  {
    id: 51,
    title: 'Living as We Are',
    completionTime: 0,
    locked: true,
  },
  {
    id: 52,
    title: 'Meditation',
    completionTime: 0,
    locked: true,
  },
  {
    id: 53,
    title: 'Understanding Oneself',
    completionTime: 0,
    locked: true,
  },
  {id: 54, title: 'Muscles', completionTime: 0, locked: true},
  {
    id: 55,
    title: 'Perception',
    completionTime: 0,
    locked: true,
  },
  {
    id: 56,
    title: 'Truth',
    completionTime: 0,
    locked: true,
  },
  {id: 57, title: 'Noise', completionTime: 0, locked: true},
  {
    id: 58,
    title: 'Habits',
    completionTime: 0,
    locked: true,
  },
  {id: 59, title: 'Death', completionTime: 0, locked: true},
  {
    id: 60,
    title: 'Respectability',
    completionTime: 0,
    locked: true,
  },
  {id: 61, title: 'Desire', completionTime: 0, locked: true},
  {
    id: 62,
    title: 'Conditioning',
    completionTime: 0,
    locked: true,
  },
  {id: 63, title: 'Memory', completionTime: 0, locked: true},
  {
    id: 64,
    title: 'Living as We Are',
    completionTime: 0,
    locked: true,
  },
];

export default function useMeditations() {
  const storageKey = '@meditations_completed';
  const [meditations, setMeditations] = useState(initialState);

  // This initialises data from local storage when the hook is first used (brackets second arg so only runs once)
  useEffect(() => {
    getData(storageKey).then((data) =>
      data != null ? setMeditations(JSON.parse(data)) : null,
    );
  }, []);

  // Updates local state and local storage
  function setAndStoreMeditations(updatedMeditations) {
    setMeditations(updatedMeditations);
    storeData(storageKey, updatedMeditations);
  }

  // Unlock next meditation (id is the next meds id)
  function unlockMeditation(id) {
    const updatedMeditations = [...meditations];
    updatedMeditations[id].locked = false;
    setAndStoreMeditations(updatedMeditations);
  }

  // id is for current meditation
  function updateCompletionTime(id, newTime) {
    const meditation = meditations.find((m) => m.id === id);
    if (meditation && newTime > meditation.completionTime) {
      const updatedMeditations = [...meditations];
      updatedMeditations[id].completionTime = newTime;
      setAndStoreMeditations(updatedMeditations);
    }
  }

  // Use this to reset the stars to 0
  function resetCompletionTimes() {
    const updatedMeditations = meditations;
    updatedMeditations.forEach((m) => (m.completionTime = 0));
    setAndStoreMeditations(updatedMeditations);
  }

  function resetFully() {
    const updatedMeditations = meditations;
    updatedMeditations.forEach((m) => {
      m.completionTime = 0;
      m.locked = m.id == 0 ? false : true;
    });
    setAndStoreMeditations(initialState);
  }

  return {
    meditations,
    unlockMeditation,
    updateCompletionTime,
    resetCompletionTimes,
    resetFully,
  };
}
