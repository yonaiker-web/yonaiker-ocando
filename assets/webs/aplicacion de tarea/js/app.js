//document.getElementById('formTask') -> seleccionar del documento (la pagina) el elemento con el ID formTask
//.addEventListener('submit', ); -> agrega un evento submit y ejecuta la funcion
document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e)
{
    //la propiedad .value solo guarda el valor almacenado
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    const task = {
        title,
        description
    };

    //el metodo setItem permite almacenar un dato en la memoria interna del navegador
    //luego se le pasan parametros el cual el primero es el nombre como se guardara
    // y el segundo donde donde se guardara
    //el metodo JSON.stringify convierte datos de objetos a string
    //el metodo JSON.parse convierte datos de sting a objetos
    //el metodo push se encarga de actualizar

    if (localStorage.getItem('tasks') === null) 
    {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    else
    {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    getTasks();
    //el metodo reset resetea o limipia
    document.getElementById('formTask').reset();
    //Evita que la pagian se refresque
    e.preventDefault();
}


function getTasks()
{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++)
    {
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">
            Delete
          </a>
          </p>
        </div>
      </div>`;
    }
}

function deleteTask(title)
{
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title)
        {
            //el metodo splice sirve para eliminar datos de un arreglo
            //en los parametros se le indica que dato tiene que quitar y cuantas veces
            tasks.splice(i, 1)    
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTasks();
}

getTasks();