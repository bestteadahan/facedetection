import sys
import face_recognition

headpath = sys.argv[1]
passportpath = sys.argv[2]

head = face_recognition.load_image_file(headpath)
head_encoding = face_recognition.face_encodings(head)[0]

known_encodings = [head_encoding]

passport = face_recognition.load_image_file(passportpath)
passport_encoding = face_recognition.face_encodings(passport)[0]

face_distances = face_recognition.face_distance(
    known_encodings, passport_encoding)

print(face_distances[0])