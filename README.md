# RickNMorty
This repo hosts the technical interview for the Blossom FullStack Engineer Role
The project uploaded was tested on Android Studio with the following specifications
npm: z10.2.4
java_sdk: jv-17
yarn: v1.22.22
node.js: v20.11.1

# Project Name

A full-stack project with a **frontend** built in React Native and a **backend** using GraphQL (Apollo Server). This project is tested on **Android Studio** using a Pixel 6 emulator (System Image Q 29).

---

## **Table of Contents**
1. [Requirements](#requirements)
2. [Setup Instructions](#setup-instructions)
   - [Backend](#backend-setup)
   - [Frontend](#frontend-setup)
3. [Running the Project](#running-the-project)
   - [Start the Backend](#start-the-backend)
   - [Start the Frontend](#start-the-frontend)
4. [Testing with Android Studio](#testing-with-android-studio)
5. [Troubleshooting](#troubleshooting)

---

## **Requirements**

Ensure you have the following installed on your machine:

1. **Node.js** (v16 or higher)
   - [Download Node.js](https://nodejs.org/)
2. **yarn**
3. **Android Studio** with a configured emulator (Pixel 6, System Image Q 29).
   - Follow the setup guide on the [Android Studio documentation](https://developer.android.com/studio).
   - Follow the setup guide on [https://reactnative.dev/docs/set-up-your-environment]
4. **Expo CLI** (if using Expo for React Native)
   - Install globally: [`npm install -g expo-cli`](https://docs.expo.dev/more/expo-cli/)

---

## **Setup Instructions**

### **Backend Setup**
1. Navigate to the backend directory:
   cd RickNMorty/server
2. Install node_modules
3. Test your apollo server

### **Frontend Setup**
1. Navigate to the Frontend directory from another bash:
2. cd RickNMorty/RickNMorty/ricknmorty-client
3. Install node_modules

### **Finish Frontend Environment Setup: Android Studio Emulator**
1. Please follow the environment setup for Android Studio 
2. Open Android Studio and open the project on your ricknmorty-client
3. Create a Device (Better to use se Pixel 6, with Q 29 from original configuration)
4. From your frontend terminal run "npm run Android" to start uploading the app on your Emulator

### **Troubleshooting**
Common Issues:
Metro Bundler not connecting to the emulator:
  Ensure the emulator is running before starting the frontend.
Try restarting the Metro Bundler:
  npm start --reset-cache
Your local enpoint might not query correctly due to IP address
  Emulating on Android Studio might require you to use your IPv4 address, you can rearch this on your cmd typing "ipconfig", update this variable on App.tsx file or create your .env to store local variables
Emulator not loading the app:

Verify that adb recognizes the emulator:
  adb devices, If no device is listed, restart the emulator and reconnect.
Dependencies not installed:
  Ensure you have run npm install in both frontend and backend directories.

### **Key Highlights**
1. **Requirements Section**: Ensures all necessary tools are installed.
2. **Separate Instructions for Backend and Frontend**: Clear guidance for navigating, installing dependencies, and running each part.
3. **Testing with Android Studio**: Specific setup for the Pixel 6 emulator and troubleshooting common issues.
4. **Troubleshooting Section**: Covers common problems with solutions.
