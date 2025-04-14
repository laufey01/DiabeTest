import React from "react";
import predictionImg from "../assets/prediction.jpeg";
import visualizationImg from "../assets/Visualization.jpeg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <div
        className="flex flex-col items-center justify-center h-screen w-full"
        style={{
          background: "linear-gradient(to bottom, rgba(73, 143, 230, 0.4) 0%, rgba(255, 255, 255, 1) 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "multiply",
        }}
      >
        <div className="p-8 text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 100,
              delay: 0.5,
            }}
            className="text-gray-500 font-extrabold"
            style={{
              fontFamily: "Arial",
              fontSize: "clamp(30px, 5vw, 50px)",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            Welcome to the Diabetes Predictor!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100,
              delay: 1,
            }}
            className="text-gray-500 font-extrabold"
            style={{
              fontFamily: "'Lucida Console ExtraBold', Sans-serif",
              fontSize: "clamp(20px, 4vw, 40px)",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            Know your risk
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              delay: 1.2,
            }}
            className="text-gray-500 font-extrabold"
            style={{
              fontFamily: "'Lucida Console ExtraBold', Sans-serif",
              fontSize: "clamp(20px, 4vw, 40px)",
              lineHeight: "1.5",
              textAlign: "center",
            }}
          >
            Take control of your health.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 150 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.85,
              type: "spring",
              stiffness: 100,
              delay: 1.2,
            }}
            className="w-full max-w-xs mx-auto"
            style={{
              background: "linear-gradient(135deg, rgb(99 166 249) 0%, rgba(255,255,255,1) 100%)",
              borderRadius: "30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <Link
              to="/prediction"
              className="w-full h-full flex items-center justify-center"
              style={{
                fontFamily: "Arial",
                fontSize: "clamp(14px, 3vw, 23px)",
                fontWeight: "600",
                textAlign: "center",
                textDecoration: "none",
                color: "rgb(255 255 255)",
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",
              }}
            >
              GET STARTED
            </Link>
          </motion.div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 100,
          delay: 1,
        }}
      >
       
      </motion.div>
    </div>
  );
};

export default Home;
