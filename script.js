const perfis = [
    {
        id: 1,
        nome: "Comandante Vance",
        categoria: "Liderança e Estratégia Tática",
        descricao: "Líder experiente com olhar firme e autoridade natural. Especialista em gerenciar crises e manter a equipe unida em terrenos hostis.",
        imagem: "img/perfil1.png"
    },
    {
        id: 2,
        nome: "Especialista Chen",
        categoria: "Análise Científica e Dados",
        descricao: "Mente analítica e observadora. Focado em decodificar fenômenos atmosféricos e mapear os recursos minerais do planeta.",
        imagem: "img/perfil2.png" 
    },
    {
        id: 3,
        nome: "Navegadora Miller",
        categoria: "Exploração de Terreno e Botânica",
        descricao: "Determinada e atenta aos detalhes do ecossistema. Possui grande adaptabilidade para identificar rotas seguras e vegetações alienígenas.",
        imagem: "img/perfil3.png"
    },
    {
        id: 4,
        nome: "Agente Nova",
        categoria: "Segurança e Operações Rápidas",
        descricao: "Prática, ágil e focada na proteção da base. Especialista em reações rápidas diante de ameaças desconhecidas e falhas de equipamento.",
        imagem: "img/perfil4.png"
    }

];

const form = document.getElementById ("form-missaoaura");
const divResultado = document.getElementById ("resultado");
const btnRefazer = document.getElementById ("btn-refazer");

form.addEventListener("submit", function(event) {   
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const nascimento = document.getElementById("data").value;

    if(!nome || !nascimento) {
       alert("Por favor, preencha todos os campos obrigatórios!");
       return;
    }
    const datanascimento = new Date(nascimento + "T00:00:00");
    const anoatual = 2026;
    const hoje = new Date(2026, 9, 9);

    if(datanascimento > hoje) {
       alert("A data de nascimento não pode ser no futuro!");
       return;
    }
    let idade = anoatual - datanascimento.getFullYear();
    const mesatual = hoje.getMonth();
    const diaatual = hoje.getDate();

    if(mesatual < datanascimento.getMonth() || (mesatual === datanascimento.getMonth() && diaatual < datanascimento.getDate())) {
       idade--;
    }
    const contagem = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (let i = 1; i <= 4; i++) {
        const resposta = document.querySelector(`input[name="p${i}"]:checked`);
        if(resposta) {
            contagem[resposta.value]++;
        }
    }
    
    let maxvotos = -1;
    let perfilidselect = 1;
    for (const [id, votos] of Object.entries(contagem)) {
        if (votos > maxvotos) {
            maxvotos = votos;
            perfilidselect = parseInt(id);
        }
    }
    const perfilfinal = perfis.find(p => p.id === perfilidselect);

    document.getElementById("nome").textContent = nome;
    document.getElementById("idade").textContent = idade;
    document.getElementById("perfil-nome").textContent = perfilfinal.nome;
    document.getElementById("categoria").textContent = perfilfinal.categoria;
    document.getElementById("descricao").textContent = perfilfinal.descricao;
    document.getElementById("imagem").src = perfilfinal.imagem;

    form.classList.add("oculto");
    divResultado.classList.remove("oculto");
});
btnRefazer.addEventListener("click", function() {
    form.reset();
    divResultado.classList.add("oculto");
    form.classList.remove("oculto");
 });