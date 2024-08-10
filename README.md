
# Taskify

Taskify is a sleek and intuitive to-do list application designed to streamline your task management. Built with React for the frontend and powered by a JSON server for the backend, Taskify is perfect for developers looking to quickly set up and manage their tasks.


## Features

- **Task Management**: Create, update, and delete tasks easily.
- **Task Status**: Mark tasks as completed or to be done.
- **Task Search**: Quickly search and filter tasks.
- **Task Detail Page**: View detailed information about each task.
- **Sidebar Navigation**: A collapsible sidebar to preview tasks


## Installation

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Vidhi-Mathur/Taskify.git
    ```
2. Navigate to the project directory: 
    ```bash
   cd taskify
    ```
3. Create a db.json file in the root of the project with the following content:
    ```bash
   {
     "tasks": []
   }
    ```
4. Start the backend server using json-server:
    ```bash
   json-server --watch db.json --port 3001
    ```
### Frontend Setup

1. Install the frontend dependencies:
    ```bash
   npm install
    ```
2. Start the frontend application: 
    ```bash
   npm start
    ```
    
## Usage

Once the server and frontend are running:

- Visit http://localhost:3000 to view the Taskify application.
- Use the sidebar to navigate through tasks, search, and add new tasks.
- Click on a task title to view detailed information and make updates.

## Project Struture

- `/public`: Contains the HTML template and static assets.
- `/src`
    - `/components`: Contains reusable UI components like `Header`, `SideBar`, `TaskForm`, and `ErrorDialog`.
    - `/pages`: Contains the main pages like `HomePage`, `TaskDetailPage`, and `Layout`.
    - `/store`: Context API setup to manage global state.
    - `/assets`: Contains images and other static resources.
    - `/db.json`: The JSON file used by json-server to mock the backend.
## Tech Stack

- [React](https://reactjs.org/) (18.3.1)
- [React Router](https://reactrouter.com/) (6.25.1)
- [Material-UI](https://mui.com/) (5.16.6)
- [Tailwind CSS](https://tailwindcss.com/) (3.4.7)
- [Lucide React](https://lucide.dev/) (0.424.0)


