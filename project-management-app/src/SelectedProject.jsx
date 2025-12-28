import Tasks from "./Tasks";

export default function SelectedProject({tasks,project,onDelete,onAddTask,onDeleteTask}) {
    const fromattedDate = new Date(project.date).toLocaleDateString('id-ID',{
        year: 'numeric',
        month: 'long',
        day:'numeric'
    })
  return (
    <div className="w-[35rem] mt-16">
      <header className="pb-4 mb-4 border-b-2 border-stone-300">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-stone-600 mb-2">{project.title}</h1>
          <button onClick={onDelete} className="text-stone-600 hover:text-stone-900">Delete</button>
        </div>
        <p className="mb-4 text-stone-400">{fromattedDate}</p>
        <p className="text-stone-600 whitespace-pre-wrap">{project.desc}</p>
      </header>
      <Tasks onAdd = {onAddTask} onDelete = {onDeleteTask} tasks = {tasks}/>
    </div>
  );
}
