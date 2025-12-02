# Agenda Planner Desktop Application

A simple, elegant desktop application for managing day-to-day tasks with checkbox completion tracking.

## Features
- Add, edit, and delete tasks
- Set task priorities (High, Medium, Low)
- Set time for tasks
- Mark tasks as completed with checkboxes
- Filter tasks (All, Pending, Completed)
- Local storage persistence
- Productivity statistics
- Clean, modern interface

## Installation for Development

1. Install Node.js (v14 or higher) from https://nodejs.org

2. Clone or download this project to your computer

3. Open a terminal/command prompt in the project folder

4. Install dependencies:
```bash
npm install
```

## Pile into .exe File

1. Open Command Prompt as Administrator

2. Navigate to your project:
```bash
cd E:\agenda-app
```

3. Install builder:
```bash
npm install electron-builder --save-dev
```

4. Build:
```bash
npx electron-builder --win
```

Below is a preview of my agenda_planning.exe:
![preview exe](https://github.com/xiyin66666/agenda_planning/blob/main/preview.png)

