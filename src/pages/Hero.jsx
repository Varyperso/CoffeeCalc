import Login from '../Components/User/Login'
import styles from './hero.module.css'
import Svgs from '../svg/Svgs'

//prettier-ignore
const Hero = ({ setLoggedIn }) => {

  return (
    <>
      <h1 className={styles.main__heading}><span className={styles.main__heading__span}>Welcome to Coffee-Calc!</span></h1>
      <div className={styles.login} > <Login setLoggedIn={setLoggedIn} /> </div>
      <h3>Coffee Tracking For Coffee Enthusiasts!</h3> <br/>
      <p><Svgs name="like-icon" className={`${styles.small}`} /> Tracking Your Coffee Consumption </p>
      <p><Svgs name="like-icon" className={`${styles.small}`} /> Measuring Your Blood Caffeine Levels </p>
      <p><Svgs name="like-icon" className={`${styles.small}`} /> Costing and Quantifying Your Addiction </p>
      <p><Svgs name="coffee-icon" className={`${styles.small} ${styles.blue}`} /> Personal Coffee Calculator & Statistics</p>
      <p><Svgs name="myCart-icon" className={`${styles.small} ${styles.blue}`} /> Buy Top Coffee Products </p>
      <p><Svgs name="chat-icon" className={`${styles.small} ${styles.blue}`} /> Chat Room & Private Chats </p>
      <p><Svgs name="world-icon" className={`${styles.small} ${styles.blue}`} /> View World Coffee Data & More! </p>
      
      <hr/>
      <div style={{width: "66%", margin:"0 auto"}}>Did you know that the half-life of caffeine, the main stimulant in coffee, is typically around 4 to 8 hours? <br/>
        This means that half of the caffeine you consume will be metabolized and eliminated from your body in that time. <br/> 
        However, factors like age, liver function, and even pregnancy can affect how quickly caffeine is processed.  <br/>
        For some, the effects of coffee can last much longer! Did you know that if you&apos;re a slow metabolizer, caffeine could stay in your system for up to 12 hours?  <br/>
        So, drinking coffee later in the day might affect your sleep!</div>
      <br/>
      <div style={{width: "66%", margin:"0 auto"}}>This website was built as my final college project. <br/>
       The main idea/feature was tracking and presenting personal coffee consumption history throughout time. <br/>
       A user can change his own caffeine half-life in realtime(as he percieves to be his own personal caffeine metabolism rate) through a bar and see how the caffeine consumption graph changes accordingly. <br/>
       Each user has his own personal History and the ability to input different coffee types he consumed, serving sizes, time, place and mood and the graphs will store and reflect his current & previous caffeine levels. <br/>
       graphs by day/week/month relaying previous caffeine intake</div>  
    </>
  )
}

export default Hero