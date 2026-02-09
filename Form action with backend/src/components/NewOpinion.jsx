import { useActionState } from "react";

export function NewOpinion() {
  function submitAction(prevFormState, formData){
    const name = formData.get('userName');
    const title = formData.get('title');
    const opinion = formData.get('body');

    const errors = [];

    if(name.trim() === ''){
      errors.push('Please provide your name!');
    }

    if (title.trim()==='') {
      errors.push('Please input your title!')
    }

    if (opinion.trim()==='') {
      errors.push('Opinion must be provided!')
    }

    if (errors.length > 0) {
      return {errors,
        enteredValues: {
          name,
          title,
          opinion
        }
      }
    }

    return {errors: null}
  }

  const [formState, formAction] = useActionState(submitAction, {
    errors:null
  })

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName"  defaultValue={formState.enteredValues?.name}/>
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title"  defaultValue={formState.enteredValues?.title}/>
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.opinion}></textarea>
        </p>

       {formState.errors && <ul className="errors">
          {formState.errors.map(error => <li key={error}>{error}</li>)}
        </ul>}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
