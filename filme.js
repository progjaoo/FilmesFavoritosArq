var listaRegistros = {
    ultimoIdGerado:0,
    filme:[]
}
function desenhar(){
    const tbody= document.getElementById('listaRegistrosBody')
    if(tbody){
        tbody.innerHTML = listaRegistros.filme
                .sort( (a, b) => {
                    return a.titulo < b.titulo ? -1 : 1
                })
                .map(filme => {
                    return `<tr>
                        <td>${filme.id}</td>
                        <td>${filme.titulo}</td>
                        <td>${filme.genero}</td>
                        <td>
                        <button class='vermelho' onclick = 'perguntarSeDeleta(${filme.id})' >Excluir</button>
                        
                        </td>
                </tr>`  
            }). join('')
    }
    
}
function insertfilme(titulo, genero){
    if(titulo == ''){
        alert('Preencha o título corretamente'); 
        return;
    }
    if(genero == ''){
        alert('Preencha o genêro corretamente'); 
        return;
    }
        const id = listaRegistros.ultimoIdGerado + 1;
        listaRegistros.ultimoIdGerado = id;
        listaRegistros.filme.push({
            id, titulo, genero
        })
    desenhar ()
    vizualizar('lista') 
}
function deletefilme(id){
    listaRegistros.filme = listaRegistros.filme.filter(filme => {
        return filme.id != id
    })
    
    desenhar()
}
function perguntarSeDeleta (id){
    if(confirm('Quer excluir o filme de ID ' + id))
    deletefilme(id)
}

function submeter(e){
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        titulo: document.getElementById('titulo').value,
        genero: document.getElementById('genero').value,
    }
    if(data.id){
        editfilme(...data)
    }
    else{
      insertfilme(data.titulo, data.genero)
    }
    document.getElementById('genero').value=''; // Limpa o campo
    document.getElementById('titulo').value=''; // Limpa o campo
}

function vizualizar(pagina){
    document.body.setAttribute('page',pagina)
    if(pagina === 'cadastro'){
        document.getElementById('titulo').focus()
    }
}

window.addEventListener('load', () =>{
    desenhar()

    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
})
