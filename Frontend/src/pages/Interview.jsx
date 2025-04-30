import { useState, useRef } from 'react';
import Button from '../components/Button'; // Import Button component
import axios from 'axios'; // Import axios for HTTP requests

// Interview questions
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

function Interview() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  // Handle start recording
  const handleStartRecording = () => {
    setIsRecording(true);
    setIsTimerActive(true);
    setRecordedChunks([]);
    setTimer(30);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        mediaRecorderRef.current = new MediaRecorder(stream);

        mediaRecorderRef.current.ondataavailable = (event) => {
          setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
        };

        mediaRecorderRef.current.onstop = () => {
          const videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(videoBlob);
          console.log('Video URL:', videoUrl);
          // Send video data to backend here
          sendVideoToBackend(videoBlob);
        };

        mediaRecorderRef.current.start();
        startTimer();
      })
      .catch((error) => {
        console.error('Error accessing webcam: ', error);
      });
  };

  // Handle stop recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    clearInterval(timerRef.current);
    setIsTimerActive(false);
  };

  // Start the timer countdown
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerRef.current);
          handleStopRecording();
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  // Send video data to backend
  const sendVideoToBackend = async (videoBlob) => {
    const formData = new FormData();
    formData.append('video', videoBlob, `question-${currentQuestion + 1}.webm`);
    formData.append('userId', 'USER_ID'); // Here you will dynamically add the logged-in user ID

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/interview/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        console.log('Video data sent successfully');
      } else {
        console.error('Error sending video data');
      }
    } catch (error) {
      console.error('Error while sending video to backend:', error);
    }
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert('Interview finished!');
      // Redirect to result page or another action after the interview
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-inter px-6 py-12">
      <div className="w-full max-w-xl bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
        {/* Timer Progress Bar */}
        <div className="mb-6">
          <div className="relative w-full bg-gray-600 rounded-full h-2">
            <div
              className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
              style={{ width: `${(timer / 30) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-lg">{timer}s</p>
        </div>

        {/* Video Recording */}
        <div className="flex justify-center mb-6">
          <video ref={videoRef} autoPlay muted className="w-full max-w-md rounded-lg"></video>
        </div>

        {/* Question Display */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">{questions[currentQuestion]}</h2>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            text={isRecording ? 'Stop Recording' : 'Start Recording'}
            onClick={isRecording ? handleStopRecording : handleStartRecording}
            className={isRecording ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'}
          />
          <Button
            text="Next Question"
            onClick={handleNextQuestion}
            className="bg-green-600 hover:bg-green-500"
          />
        </div>
      </div>
    </div>
  );
}

export default Interview;
