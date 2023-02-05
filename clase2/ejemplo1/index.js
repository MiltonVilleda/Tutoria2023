contador = 0
id = null
tarea = null
tareas = []

function add() {
    let nombre = document.getElementById('nombre').value
    let desc = document.getElementById('desc').value
    let prioridad = document.getElementById('prioridad').value

    if (nombre != '' && desc != '' && prioridad != ''){
        let tarea = {
            id: contador,
            nombre: nombre,
            desc: desc,
            prioridad: prioridad
        }
        contador += 1
        tareas.push(tarea)
        console.log(tareas)
        alert('Tarea ingresada')
        getTareas()
    } else {
        alert('Campos incompletos')
    }

    document.getElementById('nombre').value = ''
    document.getElementById('desc').value = ''
    document.getElementById('prioridad').value = ''
}

function getTareas() {
    tareas = tareas.sort(function(a,b) {
        return b.prioridad - a.prioridad
    })
    let code = ''
    for (let tarea of tareas) {
        code += `<tr>
        <td>${tarea.nombre}</td>
        <td>${tarea.desc}</td>
        <td>${tarea.prioridad}</td>
        <td>
            <button type="button" onclick="set_id(${tarea.id})" class="btn btn-primary"
            data-bs-toggle="modal" data-bs-target="#exampleModal">editar</button>
        </td>
        <td>
            <button type="button" onclick="eliminar(${tarea.id})" class="btn btn-danger">eliminar</button>
        </td>
    </tr>`
    }
    document.getElementById('detalle').innerHTML = code
}

function set_id(id_tarea) {
    id = id_tarea
    tarea = tareas.find(element => element.id == id)
    document.getElementById('t_nombre').value = tarea.nombre
    document.getElementById('t_desc').value = tarea.desc
    document.getElementById('t_prioridad').value = tarea.prioridad
}

function editar() {
    let nombre = document.getElementById('t_nombre').value
    let desc = document.getElementById('t_desc').value
    let prioridad = document.getElementById('t_prioridad').value

    if (nombre != '' && desc != '' && prioridad != ''){
        let new_tarea = {
            id: id,
            nombre: nombre,
            desc: desc,
            prioridad: prioridad
        }
        let index = 0
        for (let tarea of tareas) {
            if (tarea.id == id) {
                tareas[index] = new_tarea
                break
            }
            index += 1
        }
        console.log(tareas)
        alert('Tarea actualizada')
    } else {
        alert('Campos incompletos')
    }

    document.getElementById('t_nombre').value = ''
    document.getElementById('t_desc').value = ''
    document.getElementById('t_prioridad').value = ''
    getTareas()
}

function eliminar(id) {
    console.log(`eliminar ${id}`)
    tareas = tareas.filter(function(item) {
        return item.id != id
    })
    console.log(tareas)
    getTareas()
}