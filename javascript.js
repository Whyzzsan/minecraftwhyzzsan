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

// Menu móvel acessível e utilizável por toque e teclado.
document.querySelectorAll('.topo').forEach(cabecalho => {
    const botaoMenu = cabecalho.querySelector('.menu-toggle');
    const menu = cabecalho.querySelector('.menu');
    if (!botaoMenu || !menu) return;

    const fecharMenu = () => {
        cabecalho.classList.remove('menu-aberto');
        botaoMenu.setAttribute('aria-expanded', 'false');
        botaoMenu.querySelector('.menu-toggle-icone').textContent = '\u2630';
    };

    botaoMenu.addEventListener('click', () => {
        const aberto = botaoMenu.getAttribute('aria-expanded') !== 'true';
        cabecalho.classList.toggle('menu-aberto', aberto);
        botaoMenu.setAttribute('aria-expanded', String(aberto));
        botaoMenu.querySelector('.menu-toggle-icone').textContent = aberto ? '\u00d7' : '\u2630';
    });

    menu.addEventListener('click', evento => {
        if (evento.target.closest('a')) fecharMenu();
    });

    document.addEventListener('keydown', evento => {
        if (evento.key === 'Escape') fecharMenu();
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 760) fecharMenu();
    });
});

// Entradas suaves ao rolar, com conteúdo visível como fallback sem suporte a IO.
(() => {
    const seletores = '.cabecalho-secao, .cartao, .wiki-verbete, .calculadora-coordenadas, .wiki-nota, .sorteador-desafio, .navegacao-paginas';
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzirMovimento || !('IntersectionObserver' in window)) return;

    const alvos = document.querySelectorAll(seletores);
    if (!alvos.length) return;

    alvos.forEach((alvo, indice) => {
        alvo.classList.add('revelar-ao-rolar');
        if (alvo.classList.contains('cartao') || alvo.classList.contains('wiki-verbete')) {
            alvo.style.setProperty('--atraso-revelacao', `${(indice % 3) * 65}ms`);
        }
    });

    const observador = new IntersectionObserver((entradas, instancia) => {
        entradas.forEach(entrada => {
            if (!entrada.isIntersecting) return;
            entrada.target.classList.add('revelado');
            instancia.unobserve(entrada.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });

    alvos.forEach(alvo => observador.observe(alvo));
})();
