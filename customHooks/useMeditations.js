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
    title: 'Concentration',
    locked: true,
    completionTime: 0,
  },
  {
    id: 3,
    title: 'The Past',
    locked: true,
    completionTime: 0,
  },
  {
    id: 4,
    title: 'The Future',
    locked: true,
    completionTime: 0,
  },
  {
    id: 5,
    title: 'The Present',
    locked: true,
    completionTime: 0,
  },
  {id: 6, title: 'Overload', locked: true, completionTime: 0},
  {
    id: 7,
    title: 'Nervousness',
    locked: true,
    completionTime: 0,
  },
  {id: 8, title: 'Seeing', locked: true, completionTime: 0},
  {
    id: 9,
    title: 'Avoidance',
    locked: true,
    completionTime: 0,
  },
  {id: 10, title: 'Aloness', locked: true, completionTime: 0},
  {
    id: 11,
    title: 'Judging',
    locked: true,
    completionTime: 0,
  },
  {id: 12, title: 'Happiness', locked: true, completionTime: 0},
  {
    id: 13,
    title: 'Hacks',
    locked: true,
    completionTime: 0,
  },
  {
    id: 14,
    title: 'Hurt',
    locked: true,
    completionTime: 0,
  },
  {
    id: 15,
    title: 'Choice',
    locked: true,
    completionTime: 0,
  },
  {id: 16, title: 'Desire', locked: true, completionTime: 0},
  {
    id: 17,
    title: 'Two Monks',
    locked: true,
    completionTime: 0,
  },
  {
    id: 18,
    title: 'Enlightenment',
    locked: true,
    completionTime: 0,
  },
  {id: 19, title: 'Advice', locked: true, completionTime: 0},
  {
    id: 20,
    title: 'Mind Identification',
    locked: true,
    completionTime: 0,
  },
  {id: 21, title: 'The Thinker', locked: true, completionTime: 0},
  {
    id: 22,
    title: 'Vitality',
    locked: true,
    completionTime: 0,
  },
  {id: 23, title: 'Alternate Life', completionTime: 0, locked: true},
  {
    id: 24,
    title: 'High-street ',
    completionTime: 0,
    locked: true,
  },
  {id: 25, title: 'Purpose', completionTime: 0, locked: true},
  {
    id: 26,
    title: 'Resolving',
    completionTime: 0,
    locked: true,
  },
  {
    id: 27,
    title: 'Break the Spell',
    completionTime: 0,
    locked: true,
  },
  {
    id: 28,
    title: 'Stoicism',
    completionTime: 0,
    locked: true,
  },
  {id: 29, title: 'Expectations', completionTime: 0, locked: true},
  {
    id: 30,
    title: 'Achieving',
    completionTime: 0,
    locked: true,
  },
  {
    id: 31,
    title: 'Conditions',
    completionTime: 0,
    locked: true,
  },
  {id: 32, title: 'Conditions II', completionTime: 0, locked: true},
  {
    id: 33,
    title: 'Productivity',
    completionTime: 0,
    locked: true,
  },
  {id: 34, title: 'Environment', completionTime: 0, locked: true},
  {
    id: 35,
    title: 'Thoughts',
    completionTime: 0,
    locked: true,
  },
  {id: 36, title: 'Labels', completionTime: 0, locked: true},
  {
    id: 37,
    title: 'Beyond',
    completionTime: 0,
    locked: true,
  },
  {id: 38, title: 'Tranquillity', locked: true},
  {
    id: 39,
    title: 'Emotions',
    completionTime: 0,
    locked: true,
  },
  {
    id: 40,
    title: 'Externals',
    completionTime: 0,
    locked: true,
  },
  {
    id: 41,
    title: 'Answers',
    completionTime: 0,
    locked: true,
  },
  {id: 42, title: 'Brain Name', completionTime: 0, locked: true},
  {
    id: 43,
    title: 'Exploring',
    completionTime: 0,
    locked: true,
  },
  {
    id: 44,
    title: 'Gratitude',
    completionTime: 0,
    locked: true,
  },
  {id: 45, title: 'Cravings', completionTime: 0, locked: true},
  {
    id: 46,
    title: 'Inflammable',
    completionTime: 0,
    locked: true,
  },
  {id: 47, title: 'Seriously!', completionTime: 0, locked: true},
  {
    id: 48,
    title: 'Journey',
    completionTime: 0,
    locked: true,
  },
  {id: 49, title: 'Logos', completionTime: 0, locked: true},
  {
    id: 50,
    title: 'Useful?',
    completionTime: 0,
    locked: true,
  },
  {id: 51, title: 'Fear', completionTime: 0, locked: true},
  {
    id: 52,
    title: 'You',
    completionTime: 0,
    locked: true,
  },
  {
    id: 53,
    title: 'Obligation',
    completionTime: 0,
    locked: true,
  },
  {
    id: 54,
    title: 'Limitations',
    completionTime: 0,
    locked: true,
  },
  {id: 55, title: 'Problems', completionTime: 0, locked: true},
  {
    id: 56,
    title: 'Epictetus',
    completionTime: 0,
    locked: true,
  },
  {
    id: 57,
    title: 'Seneca',
    completionTime: 0,
    locked: true,
  },
  {id: 58, title: 'Aurelius', completionTime: 0, locked: true},
  {
    id: 59,
    title: 'Naval',
    completionTime: 0,
    locked: true,
  },
  {id: 60, title: 'Go with The Flow', completionTime: 0, locked: true},
  {
    id: 61,
    title: 'Language is Limited',
    completionTime: 0,
    locked: true,
  },
  {id: 62, title: 'Embrace the Unwritten', completionTime: 0, locked: true},
  {
    id: 63,
    title: 'Nameless is Limitless',
    completionTime: 0,
    locked: true,
  },
  {id: 64, title: 'Enough is Enough', completionTime: 0, locked: true},
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
