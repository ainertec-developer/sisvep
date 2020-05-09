

///---------------------------------------------tela principal de Estoque-----------------------------------------------









//vetor responsavel por guardar em tempo de execução os produtos da busca
var VETORPRODUTOCLASSESTOQUE=[];









//funcao responsavel pela autenticacao no setor estoque
function autenticacaoEstoqueFacede(){
    
    VETORPRODUTOCLASSESTOQUE=[];
    var situacao = autenticacaoLogin();
    
    if(JSON.parse(situacao).tipo == 'Administrador' || JSON.parse(situacao).tipo == 'Comum'){
        document.getElementById('janela2').innerHTML = telaEstoque();
    }else{
        mensagemDeErro("Usuário não autorizado!");
    }

}










//funcao responsavel pela tela principal de estoque
function telaEstoque(){
    
    var codigoHTML='';

    codigoHTML+='<h3 class="text-center">Estoque</h3>'
    

    codigoHTML+='<div class="card-deck col-6 mx-auto d-block" style="margin-top:30px;">'
        codigoHTML+='<h5 class="text-center">Buscar</h5>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaProduto" type="text" class="form-control" placeholder="Nome">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="input-group mb-3">'
            codigoHTML+='<input id="buscaProdutoQuantidade" type="Number" class="form-control" placeholder="Quantidade">'
        codigoHTML+='</div>'
        codigoHTML+='<div class="btn-group btn-lg btn-block" role="group" aria-label="Basic example">'
            codigoHTML+='<button onclick="buscarProdutoEstoque(\'nome\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Nome</button>'
            codigoHTML+='<button onclick="buscarProdutoEstoque(\'quantidade\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Buscar por Quantidade</button>'
            codigoHTML+='<button onclick="buscarProdutoEstoque(\'todos\');" type="button" class="btn btn-outline-primary"><span class="fas fa-search"></span> Exibir todos</button>'
        codigoHTML+='</div>'
    codigoHTML+='</div>'

    codigoHTML+='<h5 class="text-center" style="margin-top:30px;">Lista de Produtos</h5>'
    codigoHTML+='<table id="tabelaDeProdutosEstoque" class="table table-bordered bg-light">'
    codigoHTML+='</table>'

    return codigoHTML;

}










//funcao responsavel por carregar os dados dos produtos para estoque
function carregarProdutosEstoque(json, posicao){
    
    var codigoHTML='';

    codigoHTML+='<tr>'
        codigoHTML+='<td>'+json.barcode+'</td>'
        codigoHTML+='<td>'+json.name+'</td>'
        codigoHTML+='<td>'+json.stock+'</td>'
        codigoHTML+='<td><input id="quantidadeItem'+posicao+'" type="Number" class="form-control" placeholder="Adicionar quantidade"></td>'
        codigoHTML+='<td><button onclick="atualizarEstoqueDeProduto('+posicao+')" type="button" class="btn btn-primary"><span class="fas fa-sync-alt"></span> Atualizar</button></td>'
    codigoHTML+='</tr>'

    return codigoHTML;

}










//funcao responsavel por buscar e listar os produtos da busca
async function buscarProdutoEstoque(tipo){

    VETORPRODUTOCLASSESTOQUE=[];
    document.getElementById('tabelaDeProdutosEstoque').innerHTML = '';
    var user = JSON.parse(sessionStorage.getItem('login')), cont=0;

    var codigoHTML='';
    codigoHTML+='<thead>'
        codigoHTML+='<tr>'
            codigoHTML+='<th scope="col">Código</th>'
            codigoHTML+='<th scope="col">Nome</th>'
            codigoHTML+='<th scope="col">Quantidade</th>'
            codigoHTML+='<th scope="col">Adicionar</th>'
            codigoHTML+='<th scope="col">#</th>'
        codigoHTML+='</tr>'
    codigoHTML+='</thead>'
    codigoHTML+='<tbody>'


    if(tipo=='nome'){
        if(validaDadosCampo(['#buscaProduto'])){
            var json = await requisicaoGET('products?name='+document.getElementById('buscaProduto').value, {headers:{Authorization:`Bearer ${user.token}`}});
            while(json.data[cont]){
                VETORPRODUTOCLASSESTOQUE.push(json.data[cont]);
                codigoHTML+=carregarProdutosEstoque(json.data[cont], cont);
                cont++;
            }
        }else{
            mensagemDeErro('Preencha o campo nome!');
        }
        
    }else if(tipo=='quantidade'){
        if(validaDadosCampo(['#buscaProdutoQuantidade'])){
            var json = await requisicaoGET('products', {headers:{Authorization:`Bearer ${user.token}`}}), cont2=0;
            while(json.data[cont]){
                if(json.data[cont].stock<=parseInt($('#buscaProdutoQuantidade').val())){
                    VETORPRODUTOCLASSESTOQUE.push(json.data[cont]);
                    codigoHTML+=carregarProdutosEstoque(json.data[cont], cont2);
                    cont2++;
                }
                cont++;
            }
        }else{
            mensagemDeErro('Preencha o campo quantidade!')
        }

    }else if(tipo=='todos'){
        var json = await requisicaoGET('providers', {headers:{Authorization:`Bearer ${user.token}`}}), cont2=0;
        json.data.forEach(function (item) {
            while(item.products[cont]){

                var json2 = '{"_id": "'+item.products[cont]._id+'",'
                    json2+='"name": "'+item.products[cont].name+'",'
                    json2+='"description": "'+item.products[cont].description+'",'
                    json2+='"barcode": '+item.products[cont].barcode+','
                    json2+='"price": '+item.products[cont].price+','
                    json2+='"cost": '+item.products[cont].cost+','
                    json2+='"validity": "'+item.products[cont].validity+'",'
                    json2+='"stock": '+item.products[cont].stock+','
                    json2+='"createdAt": "'+item.products[cont].createdAt+'",'
                    json2+='"updatedAt": "'+item.products[cont].updatedAt+'",'
                    json2+='"provider":{"_id":"'+item._id+'"}}'

                VETORPRODUTOCLASSESTOQUE.push(JSON.parse(json2));
                codigoHTML+=carregarProdutosEstoque(JSON.parse(json2), cont2);
                cont2++;
                cont++;
            }
            cont=0;     
        });
    }


    setTimeout(function(){
        codigoHTML+='</tbody>'
        document.getElementById('tabelaDeProdutosEstoque').innerHTML = codigoHTML;
    },1000);

}









//funcao rsponsavel por atualizar a quantidade de um determinado produto
async function atualizarEstoqueDeProduto(id){

    if(validaValoresCampo(['#quantidadeItem'+id])){
        try {

            var json = '{"barcode": '+VETORPRODUTOCLASSESTOQUE[id].barcode+','
                    json+='"cost": '+VETORPRODUTOCLASSESTOQUE[id].cost+','
                    json+='"description": "'+VETORPRODUTOCLASSESTOQUE[id].description+'",'
                    json+='"name": "'+VETORPRODUTOCLASSESTOQUE[id].name+'",'
                    json+='"price": '+VETORPRODUTOCLASSESTOQUE[id].price+','
                    json+='"stock": '+(VETORPRODUTOCLASSESTOQUE[id].stock + parseInt(document.getElementById("quantidadeItem"+id).value))+','
                    json+='"validity": "'+VETORPRODUTOCLASSESTOQUE[id].validity+'"}'

            var user = JSON.parse(sessionStorage.getItem('login'))
            await requisicaoPUT('products?id='+VETORPRODUTOCLASSESTOQUE[id]._id+'&providerId='+VETORPRODUTOCLASSESTOQUE[id].provider._id, JSON.parse(json), {headers:{Authorization:`Bearer ${user.token}`}})
            mensagemDeAviso('Estoque atualizado com sucesso!');
            setTimeout(function(){
                autenticacaoEstoqueFacede();
            },1000)

        } catch (error) {
            mensagemDeErro('Não foi possível atualizar!');
        }

    }else{
        mensagemDeErro('Quantidade para adicionar inválida!')
    }
    
}