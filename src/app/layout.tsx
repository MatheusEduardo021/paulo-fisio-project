import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import './globals.css';

const nunito = Nunito_Sans({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });
export const metadata: Metadata = {
  title: 'Paulo Cavalcante | Exercício e Reabilitação do Idoso',
  description: 'Conheça o trabalho de Paulo Cavalcante, profissional dedicado ao exercício, reabilitação, mobilidade e qualidade de vida de idosos.',
  applicationName: 'Paulo Cavalcante',
  openGraph: { title: 'Paulo Cavalcante | Exercício e Reabilitação do Idoso', description: 'Mais movimento, autonomia e qualidade de vida.', locale: 'pt_BR', type: 'website' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={nunito.variable}>{children}</body></html>;
}
