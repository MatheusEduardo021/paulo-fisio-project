'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Activity, ArrowDown, ArrowRight, Check, ChevronRight, Clock3, Heart, Instagram, Menu, MessageCircle, MoveUpRight, ShieldCheck, Sparkles, UsersRound, X } from 'lucide-react';

const contactNumber = '+55 81 98652-4485';
const contactAddress = 'Rua Quarenta e Sete, 6, Caetés III, Abreu e Lima - PE, 53545-100, Brasil';
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactAddress)}`;
const instagramUrl = 'https://www.instagram.com/paulo.cavallcante/';
const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '5581986524485';
const message = 'Olá, gostaria de saber mais sobre o atendimento de fisioterapia para idosos e verificar a possibilidade de agendar uma consulta.';
const whatsappUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : `https://wa.me/?text=${encodeURIComponent(message)}`;
const services = [
  { icon: Activity, title: 'Fortalecimento muscular', text: 'Exercícios para ganhar força e facilitar as tarefas do cotidiano.' },
  { icon: ShieldCheck, title: 'Equilíbrio e prevenção de quedas', text: 'Mais confiança e segurança para se movimentar.' },
  { icon: MoveUpRight, title: 'Reabilitação funcional', text: 'Acompanhamento gradual para recuperar movimentos e funções.' },
  { icon: Heart, title: 'Mobilidade e flexibilidade', text: 'Movimentos orientados para preservar conforto e independência.' },
  { icon: UsersRound, title: 'Exercícios para autonomia', text: 'Atividades pensadas para as necessidades de cada pessoa.' },
  { icon: Sparkles, title: 'Recuperação funcional', text: 'Um plano individual, respeitando o ritmo e os objetivos de cada um.' },
];
const benefits = ['Mais autonomia no dia a dia', 'Mobilidade para fazer o que importa', 'Fortalecimento com orientação profissional', 'Mais segurança ao caminhar', 'Exercícios adequados a cada pessoa', 'Estímulo à independência e ao bem-estar'];
const nav = [['Início', '#inicio'], ['Sobre', '#sobre'], ['Depoimento', '#depoimento'], ['Serviços', '#servicos'], ['Benefícios', '#beneficios'], ['Contato', '#contato']];

function WhatsAppLink({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <a className={className} href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Abrir conversa no WhatsApp">{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#inicio');
  const navigationTarget = useRef<string | null>(null);
  const navigationTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateActiveSection = () => {
    if (navigationTarget.current) {
      setActive((previous) => previous === navigationTarget.current ? previous : navigationTarget.current!);
      return;
    }
    const marker = window.scrollY + 150;
    let current = '#inicio';
    for (const [, href] of nav) {
      const section = document.getElementById(href.slice(1));
      if (section && section.getBoundingClientRect().top + window.scrollY <= marker) current = href;
    }
    setActive((previous) => previous === current ? previous : current);
  };
  const finishNavigation = () => {
    if (!navigationTarget.current) return;
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    navigationTimer.current = null;
    navigationTarget.current = null;
    updateActiveSection();
  };
  const beginNavigation = (href: string) => {
    navigationTarget.current = href;
    setActive(href);
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    navigationTimer.current = setTimeout(finishNavigation, 700);
  };
  const handleScroll = () => {
    updateActiveSection();
    if (!navigationTarget.current) return;
    if (navigationTimer.current) clearTimeout(navigationTimer.current);
    navigationTimer.current = setTimeout(finishNavigation, 180);
  };
  useEffect(() => {
    updateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveSection);
      if (navigationTimer.current) clearTimeout(navigationTimer.current);
    };
  }, []);
  return <header className="header"><a className="brand" href="#inicio" onClick={() => beginNavigation('#inicio')} aria-label="Paulo Cavalcante, início"><span className="brand-mark brand-photo"><Image src="/paulo-cavalcante.jpg" alt="" fill sizes="44px" /></span><span><strong>Paulo Cavalcante</strong><small>Exercício &amp; Reabilitação</small></span></a>
    <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(([name, href]) => <a className={active === href ? 'active' : ''} aria-current={active === href ? 'location' : undefined} key={href} href={href} onClick={() => beginNavigation(href)}>{name}</a>)}</nav>
    <WhatsAppLink className="button button-primary header-cta">Agendar atendimento <ArrowRight size={17} /></WhatsAppLink>
    <button className="menu-toggle" type="button" aria-label={open ? 'Fechar menu' : 'Abrir menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <nav className="mobile-nav" aria-label="Navegação móvel">{nav.map(([name, href]) => <a className={active === href ? 'active' : ''} aria-current={active === href ? 'location' : undefined} key={href} href={href} onClick={() => { beginNavigation(href); setOpen(false); }}>{name}<ChevronRight size={18} /></a>)}<WhatsAppLink className="button button-primary" >Agendar atendimento <ArrowRight size={17} /></WhatsAppLink></nav>}
  </header>;
}

function Hero() {
  return <section className="hero section-wrap" id="inicio"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-line" />Cuidado que acompanha você</div><h1>Mais movimento,<br />mais <em>autonomia</em><br />e qualidade de vida.</h1><p className="hero-description">Exercícios e reabilitação para idosos, com acompanhamento profissional, cuidado individualizado e foco em uma vida mais ativa e independente.</p><div className="hero-actions"><WhatsAppLink className="button button-primary">Agende seu atendimento <ArrowRight size={18} /></WhatsAppLink><a className="button button-secondary" href="#sobre">Conheça meu trabalho <ArrowDown size={17} /></a></div><div className="trust-row"><span><Check size={16} /> Atendimento humanizado</span><span><Check size={16} /> Cuidado individualizado</span><span><Check size={16} /> Foco na autonomia</span></div></div>
    <div className="hero-visual"><div className="image-frame"><Image src="/paulo-estudando.jpg" alt="Paulo estudando e fazendo anotações durante um evento" fill priority sizes="(max-width: 760px) 92vw, 48vw" /></div><div className="photo-note"><span className="note-icon"><Heart size={19} /></span><span><strong>Conhecimento em movimento</strong><small>Estudo contínuo para cuidar melhor</small></span></div><div className="image-caption">MOVIMENTO COM PROPÓSITO <span>·</span> VIDA COM MAIS AUTONOMIA</div></div>
  </section>;
}

function Services() { return <section className="section section-services" id="servicos"><div className="section-wrap"><div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line" />Na prática</div><h2>Movimento acompanhado<br />de perto.</h2></div><p>Uma pequena prévia dos exercícios e momentos de cuidado compartilhados no perfil do Paulo. Os vídeos abrem somente quando você decide assistir.</p></div><div className="service-videos"><article className="service-video-card"><div className="service-video-frame"><video controls playsInline preload="metadata" aria-label="Vídeo de uma aluna idosa realizando exercícios funcionais"><source src="/servico-exercicios-idosos.mp4" type="video/mp4" />Seu navegador não consegue reproduzir este vídeo.</video><span className="video-label">Exercício funcional</span></div><div className="service-video-copy"><span className="video-kicker">MOVIMENTO E AUTONOMIA</span><h3>Exercícios para a vida real</h3><p>Uma aluna pratica movimentos com elásticos e equipamentos, respeitando seu ritmo e suas possibilidades.</p><a href="https://www.instagram.com/paulo.cavallcante/reel/DZ5wms9h2U2/" target="_blank" rel="noreferrer" className="card-link">Ver publicação original <MoveUpRight size={16} /></a></div></article><article className="service-video-card"><div className="service-video-frame"><video controls playsInline preload="metadata" aria-label="Paulo conversa com uma aluna idosa durante o intervalo entre séries"><source src="/servico-atendimento-paulo.mp4" type="video/mp4" />Seu navegador não consegue reproduzir este vídeo.</video><span className="video-label">Cuidado com presença</span></div><div className="service-video-copy"><span className="video-kicker">ACOLHIMENTO NO ATENDIMENTO</span><h3>Escuta também faz parte</h3><p>Paulo compartilha, com leveza, um momento de conversa com uma aluna entre as séries do treino.</p><a href="https://www.instagram.com/paulo.cavallcante/reel/DaTtytAOtzM/" target="_blank" rel="noreferrer" className="card-link">Ver publicação original <MoveUpRight size={16} /></a></div></article></div><div className="specialty-heading"><div><div className="eyebrow"><span className="eyebrow-line" />Acompanhamento individual</div><h3>Outras formas de apoiar sua autonomia.</h3></div><p>As atividades são escolhidas de acordo com os objetivos e o momento de cada pessoa.</p></div><div className="service-grid">{services.map(({ icon: Icon, title, text }, i) => <article className="service-card" key={title}><div className="service-top"><span className="service-icon"><Icon size={22} strokeWidth={1.8} /></span><span className="service-index">0{i + 1}</span></div><h3>{title}</h3><p>{text}</p><a href="#contato" aria-label={`Saiba mais sobre ${title}`} className="card-link">Saiba mais <ArrowRight size={16} /></a></article>)}</div></div></section>; }

function About() { return <section className="section about-section" id="sobre"><div className="section-wrap about-grid"><div className="about-visual"><div className="about-image"><Image src="/paulo-cavalcante.jpg" alt="Paulo Cavalcante sorrindo, sentado à mesa" fill sizes="(max-width: 760px) 90vw, 42vw" /></div><div className="about-seal"><span>SEU BEM-ESTAR<br />EM BOAS MÃOS</span><Heart size={21} /></div></div><div className="about-copy"><div className="eyebrow"><span className="eyebrow-line" />Prazer, Paulo</div><h2>Um cuidado especializado para cada fase da vida.</h2><p className="about-lead">Olá, sou Paulo Cavalcante. Meu trabalho é ajudar idosos a desenvolverem mais movimento, autonomia, segurança e qualidade de vida por meio de exercícios e acompanhamento individualizado.</p><p>O cuidado começa com uma conversa. Juntos, entendemos o que é importante para você e construímos um acompanhamento respeitoso, possível e feito para a sua realidade.</p><div className="about-details"><div><span>Formação acadêmica</span><strong>Educação Física, Fisioterapia e Mestrado em Educação Física</strong></div><div><span>Especialização</span><strong>Fisiologia do Exercício aplicada a Doenças Crônicas Não Transmissíveis</strong></div><div><span>Registros profissionais</span><strong>CREF 007222 · CREFITO 258868</strong></div><div><span>Atuação</span><strong>Exercício físico e saúde da pessoa idosa</strong></div></div><a className="text-link" href="#contato">Vamos conversar <ArrowRight size={17} /></a></div></div></section>; }

function OriginStory() { return <section className="section origin-section" id="depoimento" aria-labelledby="origin-title"><div className="section-wrap origin-grid"><div className="origin-photo-wrap"><div className="origin-photo"><Image src="/paulo-e-vovo.jpg" alt="Paulo acompanha sua avó durante um exercício de equilíbrio" fill sizes="(max-width: 760px) 92vw, 46vw" /></div><span className="origin-photo-caption"><Heart size={15} fill="currentColor" /> A primeira aluna de Paulo</span></div><div className="origin-copy"><div className="eyebrow"><span className="eyebrow-line" />Uma história de família</div><h2 id="origin-title">Foi com ela que tudo começou.</h2><p className="origin-intro">A paixão do Paulo pelo cuidado com pessoas idosas nasceu de uma relação muito especial: a que ele viveu com a própria avó.</p><blockquote><p>“O depoimento de hoje é onde minha paixão pela saúde do idoso começou! ❤️</p><p>Essa aí foi minha primeira aluna — sim, era minha avó. Foi através dela que comecei a enxergar o exercício de forma diferente, percebendo que ele vai muito além da estética e da performance. O exercício é saúde e contribui para a qualidade de vida dessa população.</p><p>Percebi como a prática de atividades físicas melhorava seu bem-estar e transformava seu dia. Com isso, entendi que a saúde do idoso é complexa e abrange fatores biopsicossociais, e que, como profissional de Educação Física e Fisioterapia, eu precisava estar presente no processo de envelhecimento dela.</p><p>Viver tudo isso com minha avó foi uma verdadeira escola. Ela não era uma aluna apaixonada por exercícios, mas eu fiz o que era preciso para promover seu bem-estar através da prática de exercícios físicos.</p><p>Hoje, ela não está mais aqui conosco, mas sempre será lembrada como minha primeira aluna e por tudo o que me ensinou e continua ensinando com o seu legado!”</p><cite>— Paulo Cavalcante</cite></blockquote></div></div></section>; }

function Benefits() { return <section className="section benefits-section" id="beneficios"><div className="section-wrap benefits-grid"><div><div className="eyebrow"><span className="eyebrow-line" />O que queremos alcançar</div><h2>Pequenos avanços.<br /><em>Grandes conquistas.</em></h2><p className="benefits-intro">Com orientação próxima e exercícios adequados, cada passo pode abrir espaço para uma vida com mais confiança e participação.</p><a className="button button-outline" href="#contato">Converse com o Paulo <ArrowRight size={17} /></a></div><div className="benefit-list">{benefits.map((benefit, i) => <div className="benefit-item" key={benefit}><span className="benefit-check"><Check size={17} /></span><span>{benefit}</span><span className="benefit-number">0{i + 1}</span></div>)}</div></div></section>; }

function HowItWorks() { const steps = [['01', 'Entre em contato', 'Converse com Paulo e esclareça suas dúvidas com tranquilidade.'], ['02', 'Avaliação individual', 'Conheça as necessidades, dificuldades e objetivos de cada pessoa.'], ['03', 'Acompanhamento personalizado', 'Exercícios e orientações adequados à sua realidade e ao seu ritmo.']]; return <section className="section how-section"><div className="section-wrap"><div className="center-heading"><div className="eyebrow"><span className="eyebrow-line" />Simples assim</div><h2>Um passo de cada vez.</h2><p>Um processo claro, próximo e pensado para você.</p></div><div className="steps-grid">{steps.map(([n, title, text]) => <article className="step-card" key={n}><span className="step-number">{n}</span><div className="step-arrow"><ArrowRight size={20} /></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>; }

function Testimonials() { return <section className="section testimonial-section"><div className="section-wrap testimonial-wrap"><div className="quote-mark">“</div><div><div className="eyebrow"><span className="eyebrow-line" />Cuidado com presença</div><h2>Seu caminho merece<br />ser ouvido.</h2><p>Este espaço será dedicado às histórias de quem recebe o acompanhamento de Paulo. Depoimentos serão publicados somente com autorização de seus autores.</p><span className="testimonial-note"><ShieldCheck size={17} /> Relatos reais, compartilhados com autorização.</span></div><div className="testimonial-placeholder"><MessageCircle size={25} /><p>Em breve, histórias de quem já começou a se movimentar com mais confiança.</p><span>DEPOIMENTOS COM AUTORIZAÇÃO</span></div></div></section>; }

function Contact() { return <><section className="cta-section" id="contato"><div className="section-wrap cta-content"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" />Vamos conversar</div><h2>Seu bem-estar<br />merece atenção.</h2><p>Entre em contato e conheça como o acompanhamento pode ajudar você ou alguém que ama.</p><WhatsAppLink className="button button-light">Agendar pelo WhatsApp <ArrowRight size={18} /></WhatsAppLink><small><ShieldCheck size={15} /> Sem compromisso. Estamos aqui para ajudar.</small></div><div className="cta-decoration" aria-hidden="true"><Heart size={220} strokeWidth={0.55} /></div></section><section className="contact-section"><div className="section-wrap contact-grid"><div><div className="eyebrow"><span className="eyebrow-line" />Fale com Paulo</div><h2>Estou por aqui<br />para ajudar.</h2></div><div className="contact-card"><div className="contact-row"><span className="contact-icon"><MessageCircle size={19} /></span><div><small>WhatsApp</small><WhatsAppLink className="contact-value">{contactNumber} <MoveUpRight size={15} /></WhatsAppLink></div></div><div className="contact-row"><span className="contact-icon"><Instagram size={19} /></span><div><small>Instagram</small><a className="contact-value" href={instagramUrl} target="_blank" rel="noreferrer">@paulo.cavallcante <MoveUpRight size={15} /></a></div></div><div className="contact-row"><span className="contact-icon"><Clock3 size={19} /></span><div><small>Horários de atendimento</small><strong>A combinar pelo WhatsApp</strong></div></div><div className="contact-row"><span className="contact-icon"><UsersRound size={19} /></span><div><small>Localização e região atendida</small><a className="contact-value address-link" href={mapUrl} target="_blank" rel="noreferrer">{contactAddress} <MoveUpRight size={15} /></a></div></div></div></div></section></>; }

function Footer() { return <footer className="footer"><div className="section-wrap footer-main"><a className="brand footer-brand" href="#inicio"><span className="brand-mark brand-photo"><Image src="/paulo-cavalcante.jpg" alt="" fill sizes="44px" /></span><span><strong>Paulo Cavalcante</strong><small>Exercício &amp; Reabilitação</small></span></a><p>Mais movimento, autonomia<br />e qualidade de vida.</p><nav aria-label="Links do rodapé">{nav.map(([name, href]) => <a href={href} key={href}>{name}</a>)}</nav><a className="footer-whatsapp" href={instagramUrl} target="_blank" rel="noreferrer"><Instagram size={18} /> Instagram <MoveUpRight size={15} /></a><WhatsAppLink className="footer-whatsapp"><MessageCircle size={18} /> WhatsApp <MoveUpRight size={15} /></WhatsAppLink></div><div className="footer-bottom section-wrap"><span>© {new Date().getFullYear()} Paulo Cavalcante. Todos os direitos reservados.</span><span>Informações profissionais a confirmar</span><a href="#inicio">Voltar ao início ↑</a></div></footer>; }

export function Site() { return <><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><Header /><main id="conteudo"><Hero /><div className="quick-strip"><div><ShieldCheck size={19} /><span>Cuidado individualizado</span></div><div><Heart size={19} /><span>Respeito em cada etapa</span></div><div><Activity size={19} /><span>Movimento com propósito</span></div></div><About /><OriginStory /><Services /><Benefits /><HowItWorks /><Testimonials /><Contact /></main><Footer /><WhatsAppLink className="floating-whatsapp"><MessageCircle size={22} /><span>Fale pelo WhatsApp</span></WhatsAppLink></>; }
