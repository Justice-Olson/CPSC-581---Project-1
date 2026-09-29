import { useState, useRef } from 'react'

// divided "final animation.mp4" to one clip per element, so the fire can be built in stages.
import fuelMove from './assets/step1-wood.mp4'
import sparkMove from './assets/step2-spark.mp4'
import windMove from './assets/step3-wind.mp4'
import fireLoop from './assets/fire-loop.mp4'

// button pictures for each element, which are shown on top of the video.
import fuelButton from './assets/woodButton.png'
import sparkButton from './assets/sparkButton.png'
import windButton from './assets/windButton.png'

import { people, team, wrongOrder } from './people.js'
import './Button.css'

// order = wood - > spark --> wind.
const STEPS = ['fuel', 'spark', 'wind']
const VIDEOS = { fuel: fuelMove, spark: sparkMove, wind: windMove }

// card for each element/team.
function PersonCard({ person }) {
   return (
      <div className='card'>
         <h2 className='card-name'>{person.name}</h2>
         <p className='card-label' style={{ color: person.color }}>{person.element}</p>
         <p className='card-why'>{person.why}</p>
         <dl>
            <dt>Experiences</dt><dd>{person.experiences}</dd>
            <dt>Likes</dt><dd>{person.likes}</dd>
            <dt>Personality</dt><dd>{person.personality}</dd>
         </dl>
      </div>
   )
}

// card for the team (after the fire is lit).
function TeamCard() {
   return (
      <div className='card card-team'>
         <h2 className='card-name'>{team.title}</h2>
         <p className='card-label'>Our team</p>
         <p className='card-why'>{team.subtitle}</p>
         <h3>What we share</h3>
         <ul>{team.similarities.map((s) => <li key={s}>{s}</li>)}</ul>
         <h3>How we differ</h3>
         <ul>{team.differences.map((d) => <li key={d}>{d}</li>)}</ul>
      </div>
   )
}

function Button() {
   // tracks how many elements have been added in the right order (0 = empty fire pit, 3 = all added).
   const [stage, setStage] = useState(0)
   // which card is currently shown on the right (null = instructions, 'fuel'/'spark'/'wind' = person card, 'team' = team card).
   const [card, setCard] = useState(null)
   // message explaining why nothing happens when the user clicks the wrong button (null = no message).
   const [hint, setHint] = useState(null)
   const [fireLit, setFireLit] = useState(false)

   const videoRef = useRef(null)

   function playVideo(src, loop = false) {
      const video = videoRef.current
      video.src = src
      video.loop = loop
      video.load()
      video.play()
   }

   // user clicked a button: if it's the right one, play the next video and show the next card; if not, show a hint.
   function handleClick(element) {
      const needed = STEPS[stage]
      if (element !== needed) {
         // explain why nothing happens, but let the user keep trying.
         setHint(wrongOrder(element, needed))
         return
      }
      setHint(null)
      setCard(element)
      playVideo(VIDEOS[element])
      setStage(stage + 1)
   }

   // final animation is the wind.
   // after the wind animation finishes, start the looping fire and show the team car
   function handleVideoEnd() {
      if (stage === STEPS.length && !fireLit) {
         setFireLit(true)
         setCard('team')
         playVideo(fireLoop, true)
      }
   }

   // puts everything back to the start so the fire can be built again.
   function reset() {
      setStage(0)
      setCard(null)
      setHint(null)
      setFireLit(false)
      const video = videoRef.current
      video.loop = false
      video.src = fuelMove
      video.load()
   }

   return (
      <div className='layout'>
         <div className='scene'>
            <video
               ref={videoRef}
               className='background-video'
               src={fuelMove}
               muted
               playsInline
               onEnded={handleVideoEnd}
            />

            {stage < 1 && (<button className='fuel-button' onClick={() => handleClick('fuel')} aria-label='Wood'><img src={fuelButton} alt='' /></button>)}
            {stage < 2 && (<button className='spark-button' onClick={() => handleClick('spark')} aria-label='Spark'><img src={sparkButton} alt='' /></button>)}
            {stage < 3 && (<button className='wind-button' onClick={() => handleClick('wind')} aria-label='Wind'><img src={windButton} alt='' /></button>)}

            {hint && (<div className='hint' onClick={() => setHint(null)}>{hint}</div>)}
         </div>

         <aside className='side-panel'>
            {card === null && (
               <div className='card'>
                  <h2 className='card-name'>Build a campfire</h2>
                  <p className='card-label'>A family of buttons</p>
                  <p className='card-why'>
                     Every fire needs wood, a spark and wind. Each button represents a different person on our team, and each one is needed to make the fire. Click the buttons in the right order to see what happens!
                  </p>
               </div>
            )}
            {card && card !== 'team' && <PersonCard person={people[card]} />}
            {card === 'team' && <TeamCard />}
            {fireLit && (<button className='reset-button' onClick={reset}>Build it again</button>)}
         </aside>
      </div>
   )
}

export default Button
