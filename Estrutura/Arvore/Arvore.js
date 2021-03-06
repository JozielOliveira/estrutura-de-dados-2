class Tree { 
    
    constructor(){
        this.valor = null
        this.direita = null
        this.esquerda = null
    }

    insert (valor) {
        if (this.valor == null) {
            this.valor = valor
        } else if (valor < this.valor){
            if (this.esquerda == null)
                this.esquerda = new Tree()
            return this.esquerda.insert(valor)
        } else{
            if (this.direita == null)
                this.direita = new Tree()
            return this.direita.insert(valor)
        }
        
    }

    search (valor, next) { 
        if (this.valor == valor)
            // Se não haver um proxima função a ser executada retorna true
            // Se haver um proxima funcão, passa como parametro o contexto em que foi encotrado o valor
            return next ? next(this) : true
        else if (valor < this.valor && this.esquerda != null)
            return this.esquerda.search(valor, next)
        else if (this.direita != null)
            return this.direita.search(valor, next)
        else
            return false
    }
    
    balancear () {
        let arr = []
        this.order(arr)
        console.log(arr)

        const tree = new Tree()
        tree.ordenar(arr)
        tree.preOrdem()
    }

    ordenar (arr) {
        let tam = arr.length % 2 == 0 ? Math.ceil(arr.length / 2) : Math.floor(arr.length / 2)
        
        if (tam != 0){
            
            this.insert(arr[tam]) // Raiz
            
            let esquerda = arr.slice(0,tam)
            this.ordenar(esquerda) //  Esquerda
            
            let direita = arr.slice(tam+1)
            if (direita[0])
                this.ordenar(direita) // Direita

        } else if (arr[0]){
                this.insert(arr[0])
        }
    }

    order (arr){
        if (this.esquerda != null)
            this.esquerda.order(arr)//Esquerda 
        arr.push(this.valor)// Raiz
        if (this.direita != null)
            this.direita.order(arr) //Direita
    }

    inOrdem () {
        if (this.valor != null)
            this.ordem("inOrdem")
    }
    
    posOrdem () {
        if (this.valor != null) {
            this.ordem("posOrdem")
            console.log(this.valor)// Raiz
        }
    }

    preOrdem () {
        if (this.valor != null) {
            console.log(this.valor)// Raiz
            this.ordem("preOrdem")
        }
    }

    ordem (func){
        if (this.esquerda != null)
            this.esquerda[func]()//Esquerda
        if (func === "inOrdem") 
            console.log(this.valor)// Raiz
        if (this.direita != null)
            this.direita[func]() //Direita
    }
                
    regra1 () {
        // Primeira regra é varificar se a raiz possue sub-arvores
        if (this.esquerda != null) // Se tiver à esquerda
            return this.esquerda.regra2("direita") // Vai pra esquerda e procura o maior valor pra atribuir no lugar
        else if (this.direita != null) // Se tiver à direita
            return this.direita.regra2("esquerda") // Vai pra direita e procura o menor valor pra atribuir no lugar
        else // Se a raiz não tiver sub-arvores, ela vai ser anulada
            return null
    }

    regra2 (ladoSubstituido) {
        // Logica => se o valor que está sendo procurado(ladoSubstituido) for da direita
        // logo o que pode tomar o lugar vai ser o da esquerda, e vise versa
        const ladoSubstituto = ladoSubstituido === "direita" ?  "esquerda" : "direita"
        if (this[ladoSubstituido] != null)
            // Caso a variavel for ladoSubstituido = direita, 
            // o algoritmo vai sempre pra direita procurando o maior
            // pois o maior está à direita
            return this[ladoSubstituido].regra2(ladoSubstituido)
        else if (this[ladoSubstituto] != null) // Caso não ter mais sub-arvores à direita, verifica-se se há à esquerda
            // Se tiver sub-arvore à esquerda, executa a troca de atributos, da esquerda, 
            // para a arvore em contexto e retorna o valor do antigo contexto
            return this.swap(this, ladoSubstituido, ladoSubstituto)
        else
            // Se tiver sub-arvore à esquerda, executa a anulação da sub-arvore em contexto,
            // e retorna o valor do antigo contexto
            return this.swap(this)

    }

    swap (ref, ladoSubstituido, ladoSubstituto) {
        const value = ref.valor // Pega o valor do contexto a ser alterado
        if (ladoSubstituido) { // Verifica se há alguma sub-arvore pare substituir
            ref.valor = ref[ladoSubstituto].valor // Atribui ao valor em contexto, o valor da posição de substituição, exemplo esquerdo
            ref[ladoSubstituido] = ref[ladoSubstituto][ladoSubstituido]// Atribui ao lado(e/d) em contexto, o valor da posição de substituiçãovalor, exemplo esquerdo
            ref[ladoSubstituto] = ref[ladoSubstituto][ladoSubstituto] ? ref[ladoSubstituto][ladoSubstituto] : null // Atribui ao lado(e/d) em contexto, o valor da posição de substituiçãovalor, exemplo direito
        } else {
            ref.valor = ref[ladoSubstituido] = ref[ladoSubstituto] = null // Se não tiver sub-arvore de substituição, anula a sub-arvore em contexto
        }
        // retorna o da sub-arvore valor antes de ser alterado
        return value
    }

    delete (valor) {
        // Chama o metodo de procura, e com a referencia de onde foi encontrada o valor
        // Aplica a primeira regra no contexto em que foi entrado o valor
        this.search(valor, ref => {
            ref.valor = ref.regra1() 
            if (!ref.esquerda)
                ref.esquerda = null
            if (!ref.direita)
                ref.direita =null
        })
    }


}

module.exports = Tree