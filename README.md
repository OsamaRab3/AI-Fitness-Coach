# AI Fitness Coach

An intelligent fitness companion that creates personalized exercise and nutrition plans powered by Gemini AI.

## 🏋️ Features

- **Personalized Workout Plans**: AI-generated exercise routines tailored to your fitness level, goals, and available equipment
- **Custom Nutrition Guidance**: Nutritional plans based on your dietary preferences and fitness objectives
- **Exercise Visualization**: Automatically generated images for each exercise to ensure proper form
- **Interactive AI Chat**: Communicate with the AI coach for questions, modifications, or motivation
- **Progress Tracking**: Monitor your fitness journey with detailed stats and achievements

## 🧠 Technology Stack

- **Frontend**:Vue.js with responsive design
- **Backend**: Node.js/Express
- **Database**: MongoDB for user profiles, workout plans, and nutrition data
- **AI Integration**: Gemini API for generating personalized content
- **API Architecture**: RESTful API design for seamless client-server communication
- **Image Generation**: AI-powered exercise visualization

## 📋 API Endpoints

### User Management
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Authenticate user
- `GET /profile/userId` - Retrieve user profile
- `PATCH /profile/userId` - Update user information

### Fitness Plans
- `GET /ai/userId/workout` - Generate new workout plan
- `GET /ai/user/workout/:id` - Retrieve specific workout
- `GET /ai/userId/nutrition` - Generate nutrition plan
- `GET /ai/userId/nutrition/:id` - Retrieve specific nutrition plan

### AI Chat
- `POST /chat/userId` - Start Chat with AI
- `GET /chat/userId` - Retrieve chat history

### Exercise Images
- `GET /exercises/userId` - Get exercise visualization


## 🔄 AI Integration

This application utilizes the Gemini API to:

1. **Generate Personalized Workouts**: The AI analyzes user fitness levels, goals, and constraints to create tailored exercise plans
2. **Create Nutrition Guidance**: Based on user preferences and nutritional needs
3. **Visualize Exercises**: Generate clear images demonstrating proper exercise form
4. **Power Conversational Support**: Enable natural language interactions for fitness advice



## 🔒 Security Considerations

- User authentication using JWT
- Password hashing with bcrypt
- Secure handling of Gemini API credentials


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.