# CodeKage Frontend

This is the frontend repository for the CodeKage application. It is built using React.js and Next.js to provide a dynamic and interactive user interface for coding.

## Code Structure

The frontend code is organized into the following directories and files:

- **components**: Contains reusable React components used throughout the application.
  - **CodeEditor**: Contains the code for the CodeEditor component, which provides a code editor interface for users to write and save code snippets.
    - **index.tsx**: The main file of the CodeEditor component that contains the React component logic.
    - **CodeEditor.css**: The CSS file for styling the CodeEditor component.
  - **Terminal**: Contains the code for the Terminal component, which displays the output of the executed code.
    - **index.tsx**: The main file of the Terminal component that contains the React component logic.
    - **Terminal.css**: The CSS file for styling the Terminal component.
  - **...**: Contains other reusable components used throughout the application.

- **pages**: Contains Next.js pages that define the routes and components for each page.
  - **index.tsx**: The main file for the landing page of the CodeKage application.
  - **...**: Contains other page files for different routes in the application.

- **styles**: Contains global styles and CSS files for styling the application.
  - **globals.css**: The main CSS file that defines global styles for the application.

- **utils**: Contains utility functions and API functions for making HTTP requests to the backend.
  - **api.ts**: Contains functions for making API requests to the backend server.

- **next.config.js**: The Next.js configuration file.

- **package.json**: The package.json file that contains the project's dependencies and scripts.

- **tsconfig.json**: The TypeScript configuration file.

- **...**: Other configuration files and files specific to the frontend setup.

## Code Structure Visual

CodeKage frontend
├── components
│   ├── CodeEditor
│   │   ├── index.tsx
│   │   └── CodeEditor.css
│   ├── Terminal
│   │   ├── index.tsx
│   │   └── Terminal.css
│   └── ...
├── pages
│   ├── index.tsx
│   └── ...
├── styles
│   ├── globals.css
│   └── ...
├── utils
│   ├── api.ts
│
├── next.config.js
├── package.json
├── tsconfig.json
└── ...


## Technologies Used

The frontend of the CodeKage application is built using the following technologies:

- **React.js**: A popular JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-side rendering, static site generation, and building web applications.
- **Monaco Editor**: A feature-rich code editor component for the web.
- **Xterm.js**: A terminal emulator library for the web, used for displaying the output of executed code.

These technologies were chosen for their flexibility, performance, and developer-friendly features, enabling us to create a robust and efficient frontend for the CodeKage application.


## Contributing

Contributions to the CodeKage frontend are welcome! If you find any issues or would like to add new features, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
