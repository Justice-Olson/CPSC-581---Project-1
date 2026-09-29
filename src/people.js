// all text content is stored here 
export const people = {
  // text for each element button
  fuel: {
    element: 'Wood',
    name: 'Justice',
    color: '#5b3b1c',
    why: 'Wood is the base every fire is built on. Justice builds things (carpentry, construction, 3D models) and gives the team a solid foundation to work from.',
    experiences: 'Carpentry (hence, the leaf in the wood), construction, digital 3D modeling, tech support, computer science, barbecuing',
    likes: 'Grand strategy games, D&D, 3D modeling, animation, reading and stories',
    personality: 'Introverted, logically creative, easily inspired',
  },
  spark: {
    element: 'Spark',
    name: 'Darcy',
    color: '#d1440d',
    why: 'A spark is small and quiet, but it is what lights everything up. Darcy is shy at first, but her passion for art and code is what brings our ideas to life.',
    experiences: 'Traditional and digital art, computer science, growing indoor plants, helped build a financial app for a club',
    likes: 'Purple, looking at and creating art, bunnies (hence, the bunny ears in the button) and seals, fashion',
    personality: 'Shy and introverted, but passionate about her interests (coding and art)',
  },
  wind: {
    element: 'Wind',
    name: 'Ana',
    color: '#4a62b1',
    why: 'Wind never stays in one place, and it brings a small flame into a real fire. Ana moved from Mexico, loves to travel and be outdoors (hence, the paper airplane in the button), and keeps the team moving.',
    experiences: 'Moved from Mexico, recently travelled around Europe, reading',
    likes: 'Being in nature (hiking, walks, the sea), the colour blue',
    personality: 'Curious, sociable, adaptable, and sometimes indecisive',
  },
}

// for the "team" page, which is shown after the fire is lit
export const team = {
  title: 'The campfire is lit!',
  subtitle: 'Wood, spark and wind: none of them can make a fire alone.',
  similarities: [
    'All three of us study computer science.',
    'Justice and Darcy both create visual things: 3D models, animation and art.',
    'Justice and Ana both enjoy being outdoors: building and barbecuing for Justice, hikes and the sea for Ana.',
    'Darcy and Ana both like bunnies, plants, and learning about new things.',
  ],
  differences: [
    'Justice and Darcy are introverted; Ana is the sociable one who gets conversations going.',
    'Justice thinks logically, Darcy expresses herself through art, and Ana learns by exploring new places.',
  ],
}

// text for the "wrong order" messages, which are shown when the user clicks the wrong button
// "clicked" is the button the user pressed, "needed" is the one the fire needs next.
export function wrongOrder(clicked, needed) {
  if (needed === 'fuel' && clicked === 'spark') {
    return 'The spark lands on the empty fire pit and fizzles out. There is nothing to burn yet. Add some wood first!'
  }
  if (needed === 'fuel' && clicked === 'wind') {
    return 'A gust of wind sweeps across the empty fire pit, but there is nothing to fan. Add some wood first!'
  }
  if (needed === 'spark' && clicked === 'wind') {
    return 'The wind blows over the logs, but without a spark nothing catches. Add a spark first!'
  }
  return 'Try another element!'
}
