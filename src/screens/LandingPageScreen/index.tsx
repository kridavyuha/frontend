import { motion } from "framer-motion";
import { Button, Text } from "@mantine/core"
import LoginScreen from "../LoginScreen"
import { useState } from "react";
import { useStores } from "../../logic/Providers/StoreProviders";
import { observer } from "mobx-react-lite";

export const LandingPageScreen: React.FC = observer(() => {

    const {appStore} = useStores();

    const caption = "Kridavyuha";
  
    return (
     <div>
      <div className="fixed min-h-screen flex flex-col justify-center items-center text-center p-4 bg-cover bg-center overflow-hidden" style={{marginBottom:'500px'}}>
      
        <div className="absolute inset-0 bg-opacity-50"></div>
        <Text style={{ fontSize: '1rem', color: 'black', fontWeight: 'bold'}}>
           Where Passion Meets Strategy – Designed by True Cricket Enthusiasts!
        </Text>
       
        <div className="relative z-10 flex flex-col items-center mt-8" >

        <motion.h1 className="text-3xl md:text-5xl font-bold text-black mb-2 flex justify-center">
            {caption.split("").map((char, index) => (
              <motion.span
              key={index}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, delay: index * 0.1 }}
              className={char === " " ? "mx-1" : char === "S" ? "font-unique" : ""}
              >
              {char}
              </motion.span>
            ))}
            </motion.h1>
     
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-1"
          >

            <Text style={{ fontSize: '1rem', color: 'black', fontWeight: 'bold', letterSpacing: '0.5px' }}>
              Beyond Luck, Beyond Fantasy
            </Text>
          </motion.div>

        
       <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="text-base md:text-xl text-grey max-w-xl text-center"
          >
            Compete in live contests, use your skills to make strategic choices, 
            and win exciting rewards. Gain insights, craft strategies, and execute your plans in real-time as the game unfolds!
          </motion.p>
        
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4"
          >
            <Button className="bg-white text-blue-600 px-4 py-2 text-base rounded-full shadow-lg hover:bg-gray-200 transition-all" onClick={() => appStore.isModalOpened = true}>
              Get Started
            </Button>
          </motion.div>
          {appStore.isModalOpened && <LoginScreen />}
        </div>
      </div>
     </div>
    );
}
);