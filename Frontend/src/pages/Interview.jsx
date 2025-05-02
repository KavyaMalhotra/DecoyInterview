// src/pages/Interview.jsx

import { useState, useRef, useEffect } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const questions = [
  "Tell us about yourself.",
  "What are your strengths?",
  "What are your weaknesses?",
  "Why do you want this job?",
  "Where do you see yourself in 5 years?",
  "Tell us about a challenge you faced.",
  "Why should we hire you?",
  "What motivates you?",
  "Describe a time you worked in a team.",
  "What is your greatest achievement?"
];

export default function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [timer, setTimer] = useState(30);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleStopRecording();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedChunks([]);
    setTimer(30);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = e => {
          if (e.data.size > 0) {
            setRecordedChunks(prev => [...prev, e.data]);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          console.log('🎥 Recorded blob:', blob);
          // No upload anymore
        };

        mediaRecorderRef.current.start();
        startTimer();
      })
      .catch(console.error);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
    clearInterval(timerRef.current);
  
    // 💀 Kill the camera stream too
    const stream = videoRef.current?.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null; // wipe the reference
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(q => q + 1);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-inter px-6 py-12">
      <div className="w-full max-w-xl bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
        {/* Timer */}
        <div className="mb-6">
          <div className="relative w-full bg-gray-600 rounded-full h-2">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
              style={{ width: `${(timer / 30) * 100}%` }}
            />
          </div>
          <p className="text-center text-lg">{timer}s</p>
        </div>

        {/* Video Preview */}
        <div className="flex justify-center mb-6">
          <video ref={videoRef} autoPlay muted className="w-full max-w-md rounded-lg" />
        </div>

        {/* Question */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">{questions[currentQuestion]}</h2>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            text={isRecording ? 'Stop Recording' : 'Start Recording'}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={isRecording ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'}
          />
          {currentQuestion < questions.length - 1 ? (
            <Button
            text="Next Question"
            onClick={() => {
              handleStopRecording();  // always stop recording first
              handleNextQuestion();   // then move on to the next
            }}
            className="bg-green-600 hover:bg-green-500"
          />
          
          ) : (
            <Button
              text="Submit Test"
              onClick={() => {
                handleStopRecording();
                navigate('/result');
              }}
              className="bg-purple-600 hover:bg-purple-500"
            />
          )}
        </div>
      </div>
    </div>
  );
}
