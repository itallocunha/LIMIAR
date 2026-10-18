import { createFileRoute } from '@tanstack/react-router';
import { LimiarSystem } from '@/system/LimiarSystem';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'SISTEMA LIMIAR | Terminal de investigação' },
    { name: 'description', content: 'Acesse o terminal interno da LIMIAR e investigue casos de fenômenos anômalos em um sistema fictício de terror.' },
    { property: 'og:title', content: 'SISTEMA LIMIAR | Terminal de investigação' },
    { property: 'og:description', content: 'Casos classificados, arquivos restritos e uma organização que permanece nas sombras.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: LimiarSystem,
});
