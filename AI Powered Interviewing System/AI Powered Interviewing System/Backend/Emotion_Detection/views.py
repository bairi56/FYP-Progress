from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import cv2
import numpy as np
import keras
from tensorflow import keras
import base64
from io import BytesIO
from keras.models import load_model
from keras.preprocessing.image import img_to_array
from PIL import Image

# Load pre-trained model
face_classifier = cv2.CascadeClassifier("D:\download\facialemotionrecognizerinrealtime-main\facialemotionrecognizerinrealtime-main\haarcascade_frontalface_default.xml")
emotion_classifier = keras.models.load_model("D:\download\facialemotionrecognizerinrealtime-main\facialemotionrecognizerinrealtime-main\model.h5")
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

class EmotionDetectionView(APIView):
    def process_frame(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_classifier.detectMultiScale(gray)
        predictions = []

        for (x, y, w, h) in faces:
            roi_gray = gray[y:y+h, x:x+w]
            roi_gray = cv2.resize(roi_gray, (48, 48), interpolation=cv2.INTER_AREA)

            if np.sum([roi_gray]) != 0:
                roi = roi_gray.astype('float') / 255.0
                roi = img_to_array(roi)
                roi = np.expand_dims(roi, axis=0)

                # Use the correct classifier variable
                prediction = emotion_classifier.predict(roi)[0]
                label = emotion_labels[prediction.argmax()]
                predictions.append({'label': label, 'x': int(x), 'y': int(y), 'w': int(w), 'h': int(h)})

        return predictions

    def post(self, request):
        try:
            frame_data = request.data.get('frame')

            if frame_data:
                # Ensure the frame_data is properly formatted
                img_data = frame_data.split(',')[1] if ',' in frame_data else frame_data
                img = Image.open(BytesIO(base64.b64decode(img_data)))
                frame = np.array(img)
                frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

                # Process the frame for emotion detection
                predictions = self.process_frame(frame)
                return Response({'predictions': predictions}, status=status.HTTP_200_OK)

            return Response({'error': 'No frame data received'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            # Log the error for debugging
            print(f"Error in EmotionDetectionView: {e}")
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
