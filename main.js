const button = document.getElementById("save");
const input = document.querySelector("input");
const list = document.getElementById("task-list");

function criarTarefa (tarefaNome, concluida = false) {
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.textContent = tarefaNome;

    if(concluida){
        span.style.textDecoration = "line-through";
        span.style.color = "#888";
    }


    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = concluida;


    check.addEventListener("change", () => {
        if(check.checked){
            span.style.textDecoration = "line-through";
            span.style.color = "#888"
        } else{
            span.style.textDecoration = "none";
            span.style.color = "inherit";
        }

        salvarTarefas();
    });

    const btnRemover = document.createElement("button");
    btnRemover.classList.add("btnRemove");
    btnRemover.textContent = "🗑️";
    btnRemover.addEventListener("click" , (e) =>{
        e.target.parentElement.remove();
        salvarTarefas();
    } );

    li.appendChild(span);
    li.appendChild(check);
    li.appendChild(btnRemover);
    list.appendChild(li);
}

function salvarTarefas(){
    const tarefas = [];
    document.querySelectorAll("#task-list li").forEach(li => {
        const span = li.querySelector("span");
        const check = li.querySelector("input[type='checkbox']");
        tarefas.push({
            nome: span.textContent,
            check:check.ariaChecked
        });
    });

    localStorage.setItem("tarefaStorage", JSON.stringify(tarefas));

}


function adicionarTarefa(){
    const tarefaNome = input.value.trim();
    if(tarefaNome ===""){
        alert("Digite uma tarefa!");
        return
    }

    criarTarefa(tarefaNome);
    salvarTarefas();

    input.value = "";
    input.focus();
}


window.onload = () => {
    const tarefasSalvas = JSON.parse(localStorage.getItem("tarefaStorage")) || [];
    tarefasSalvas.forEach(t => criarTarefa (t.nome, t.check));
};


button.addEventListener("click" , adicionarTarefa);
input.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
        adicionarTarefa();
    }
});