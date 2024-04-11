import { motion, useAnimation, useInView } from 'framer-motion'
import { ReactNode, useEffect, useRef } from 'react'

type Props={
    children: ReactNode,
    className?: string
}

const Reveal = ({children, className}: Props) => {
    const ref= useRef(null);
    const isInView=useInView(ref, {once:true});

    const mainControls= useAnimation();
    
    useEffect(()=>{
        if(isInView){
            mainControls.start("visible");
        }

    },[isInView])

  return (
    <div className={className} ref={ref}>
        <motion.div 
        variants={{
            hidden:{opacity:0,y:75},
            visible:{opacity:1,y:0}
        }}
        initial="hidden"
        animate={mainControls}
        transition={{duration:0.5, delay:0.25}}
        >
        {children}
        </motion.div>
        </div>
  )
}

export default Reveal