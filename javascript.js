const barraTopo = document.querySelector('.topo');

if (barraTopo) {
    let ultimaPosicao = window.scrollY;
    let aguardandoAtualizacao = false;

    const atualizarBarra = () => {
        const posicaoAtual = window.scrollY;
        const diferenca = posicaoAtual - ultimaPosicao;

        if (posicaoAtual <= 80 || barraTopo.matches(':focus-within')) {
            barraTopo.classList.remove('topo--oculto');
        } else if (diferenca > 5) {
            barraTopo.classList.add('topo--oculto');
        } else if (diferenca < -5) {
            barraTopo.classList.remove('topo--oculto');
        }

        ultimaPosicao = posicaoAtual;
        aguardandoAtualizacao = false;
    };

    window.addEventListener('scroll', () => {
        if (!aguardandoAtualizacao) {
            window.requestAnimationFrame(atualizarBarra);
            aguardandoAtualizacao = true;
        }
    }, { passive: true });
}
