# [Selloramas](https://sellorama.vercel.app/)

**Sellorama** is a platform empowering buyers on the web to purchase goods online after negotiation, thus reducing the monopoly of sellers in the market.
- This platform is only for the buyers, while for sellers we have the sell-at-sellorama.

## Features
- **User Authentication**: Secure registration and login for users.
- **Product Searching**: Search among millions of products that caters your need.
- **Bargain For the Best Price**: An inbuilt realtime chatting mechanism helps you to directly communicate with sellers so as to seal a deal.

## Prerequisites
- Node.js
- npm

## Setup Instructions

### 1. Download the Source Code
- Clone the repository or download the ZIP file:
    ```bash
    git clone https://github.com/Mohit-Kukreja-2002/Sellorama.git
    ```
- If you downloaded the ZIP file, extract its contents.

### 2. Open the Project
- Open the project directory in your preferred code editor.

### 3. Install Dependencies
- In the project directory, install the necessary dependencies by running:
    ```bash
    npm install
    ```

### 4. Configure Environment Variables
- Create a `.env` file in the root directory with the following content:
    ```plaintext
    # Server URL for API requests
    NEXT_PUBLIC_SERVER_URL="http://localhost:8000/api/v1"
    
    # URL for WebSocket connections
    NEXT_PUBLIC_SOCKET_URL="http://localhost:8000"
    ```

### 5. Launch the Application
- Start the development server in both client and server directory by running:
    ```bash
    npm run start
    ```

### 6. Access the Application
- Open your web browser and navigate to `http://localhost:3000` to use the application.

## Contributing
We welcome contributions! To get started, please fork the repository and submit a pull request with your changes.
