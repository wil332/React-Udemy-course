import { useState } from "react";

import NewProject from "./NewProject";
import NoProjectSelected from "./NoProjectSelected";
import ProjectSidebar from "./ProjectSidebar";
import SelectedProject from "./SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects:[],
    tasks: []
  })

  function handleAddTask(text){
    setProjectsState(prevState => {
  const taskId = Math.random();
      const newTask = {
      text:text,
      projectId: prevState.selectedProjectId,
      id: taskId
    }
      return {
        ...prevState,
        tasks: [...prevState.tasks,newTask]
      }
    })
  }
  

  function handleDeleteTask(id){
     setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task)=> task.id !== id)
      }
    })
  }

  function handleSelectProject(id){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id
      }
    })
  }

  const handleStartProject = () =>{
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancel(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }


  function handleAddProject(projectData){
    
    setProjectsState(prevState => {
      const projectId = Math.random()
      const newProject = {
      ...projectData,
      id: projectId
    }
      return {
        ...prevState,
        selectedProjectId:undefined,
        projects: [...prevState.projects,newProject]
      }
    })
  }

  function handleDeleteProject(){
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project)=> project.id !== prevState.selectedProjectId)
      }
    })
  }
  
  const selectedProject = projectsState.projects.find(project=> project.id === projectsState.selectedProjectId)
  const projectTasks = projectsState.tasks.filter(
  (task) => task.projectId === projectsState.selectedProjectId
);

  let content = <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onDeleteTask={handleDeleteTask} onAddTask = {handleAddTask} tasks={projectTasks}/>;

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd = {handleAddProject} onCancel = {handleCancel}/>
  }
  else if(projectsState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartNewProject = {handleStartProject}/>
  }

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectSidebar onStartNewProject = {handleStartProject} projects={projectsState.projects} 
      onSelectProject = {handleSelectProject} selectedProjectId={projectsState.selectedProjectId}/>
      {content}
    </main>
  );
}

export default App;
