# [Sellorama](https://sellorama.vercel.app/)

**Sellorama** is a dynamic platform designed to empower buyers by allowing them to purchase goods online through negotiation, thus reducing sellers' market dominance. Please note that this platform is intended solely for buyers; sellers should use our [Sell-at-Sellorama](https://sell-at-sellorama.vercel.app/) platform.

## Key Features
- **User Authentication**: Secure registration and login process.
- **Product Search**: Explore a vast range of products tailored to your needs.
- **Real-Time Bargaining**: Communicate directly with sellers through an integrated chat system to negotiate the best price.

## Prerequisites
- Node.js
- npm

## Setup Instructions

### 1. Clone the Repository
- Clone the repository or download the ZIP file:
    ```bash
    git clone https://github.com/Mohit-Kukreja-2002/Sellorama.git
    ```
- If you downloaded the ZIP file, extract its contents.

### 2. Open the Project
- Navigate to the project directory using your preferred code editor.

### 3. Install Dependencies
- Install the required dependencies by running:
    ```bash
    npm install
    ```

### 4. Configure Environment Variables
- Create a `.env` file in the root directory with the following configuration:
    ```plaintext
    # Server URL for API requests
    NEXT_PUBLIC_SERVER_URL="http://localhost:8000/api/v1"
    
    # URL for WebSocket connections
    NEXT_PUBLIC_SOCKET_URL="http://localhost:8000"
    ```

### 5. Start the Application
- Launch the development server by running:
    ```bash
    npm run start
    ```

### 6. Access the Application
- Open your web browser and go to `http://localhost:3000` to use the application.

## Contributing
We encourage contributions to improve Sellorama! To contribute, please fork the repository and submit a pull request with your enhancements.
